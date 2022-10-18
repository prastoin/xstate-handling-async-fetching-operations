<script setup lang="ts">
import { computed } from "vue";
import { useMachine } from "@xstate/vue";
import BaseButton from "./kit/BaseButton.vue";
import { fetchUserCart, fetchUserInformation } from "@/services/UserService";
import type { StatusLabel } from "@/type";
import StatusSection from "./kit/StatusSection.vue";
import { createLoadUserDataMachine } from "@/machines/LoadUserDataMachine";

const loadUserInformationMachine = createLoadUserDataMachine();

const { send: sendToLoadUserDataMachine, state: loadUserDataMachineState } =
  useMachine(loadUserInformationMachine, {
    services: {
      "Fetch user information": async () => await fetchUserInformation(),
      "Fetch user cart": async () => await fetchUserCart(),
    },
  });

function sendUserPressedLoadUserDataToMachine() {
  sendToLoadUserDataMachine({
    type: "User pressed load user data button",
  });
}

function sendResetContextToMachine() {
  sendToLoadUserDataMachine({
    type: "User pressed reset machine button",
  });
}

const showLoadUserDataButton = computed(
  () => loadUserDataMachineState.value.value === "Idle"
);

function getUserInformationStatus(): StatusLabel {
  if (
    loadUserDataMachineState.value.hasTag("Loading user information failed")
  ) {
    return "failed";
  }

  if (loadUserDataMachineState.value.hasTag("Loading user information")) {
    return "loading";
  }

  return "success";
}
const userInformationStatus = computed(() => getUserInformationStatus());

function getUserCartStatus(): StatusLabel {
  if (loadUserDataMachineState.value.hasTag("Loading user cart failed")) {
    return "failed";
  }

  if (loadUserDataMachineState.value.hasTag("Loading user cart")) {
    return "loading";
  }

  return "success";
}
const userCartStatus = computed(() => getUserCartStatus());
</script>

<template>
  <main class="flex flex-col justify-start items-center mt-6">
    <div data-cy="machine-current-value">
      {{ loadUserDataMachineState.value }}
    </div>
    <div class="flex flex-col">
      <template v-if="showLoadUserDataButton">
        <h4>Will be downloaded:</h4>
        <ul class="list-disc">
          <li>User Information (id, name, email, etc.)</li>
          <li>User Cart (items, credit, etc.)</li>
        </ul>
        <BaseButton
          data-cy="load-user-data-button"
          @click="sendUserPressedLoadUserDataToMachine"
        >
          Load user Data
        </BaseButton>
      </template>

      <template v-else>
        <!-- Loading -->
        <div class="flex flex-col justify-center items-start m-auto">
          <StatusSection
            v-bind:status="userInformationStatus"
            label="User Information"
            test-id="user-information"
          />

          <StatusSection
            v-bind:status="userCartStatus"
            label="User Cart"
            test-id="user-cart"
          />

          <template
            v-if="
              userInformationStatus === 'failed' || userCartStatus === 'failed'
            "
          >
            <BaseButton
              data-cy="retry-button"
              @click="sendUserPressedLoadUserDataToMachine"
            >
              Retry
            </BaseButton>
          </template>
        </div>

        <!-- Loaded -->
        <template
          v-if="
            userInformationStatus === 'success' && userCartStatus === 'success'
          "
        >
          <span class="mb-2">Reached final state</span>
          <span class="mb-2">{{
            loadUserDataMachineState.context.userInformation
          }}</span>
          <span class="mb-2">{{
            loadUserDataMachineState.context.userCart
          }}</span>
          <BaseButton @click="sendResetContextToMachine">
            Reset the machine
          </BaseButton>
        </template>
      </template>
    </div>
  </main>
</template>
