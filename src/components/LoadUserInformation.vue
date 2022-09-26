<script setup lang="ts">
export interface Props {
  status: 'failed' | 'loading' | 'success'
}
import { createLoadUserInformationMachine } from "@/machines/LoadUserInformationMachine";
import { computed, ref, watchEffect } from "vue";
import { useMachine } from "@xstate/vue";
import LoadingSection, { type StatusLabel } from "./kit/LoadingSection.vue";
import BaseButton from "./kit/BaseButton.vue";

const loadUserInformationMachine = createLoadUserInformationMachine();

const { send: sendToCounterMachine, state: loadUserDataMachineState } =
  useMachine(loadUserInformationMachine);

function loadUserInformationButtonOnClick() {
  sendToCounterMachine({
    type: "User pressed load user data button",
  });
}

function sendResetContextToMachine() {
  sendToCounterMachine({
    type: "User pressed reset machine button"
  })
}

const showLoadUserDataButton = computed(
  () =>
    loadUserDataMachineState.value.value === "Idle"
);

const userInformationStatus = ref<StatusLabel | undefined>(undefined)
watchEffect(() => {
  if (loadUserDataMachineState.value.hasTag("Loading user information failed")) {
    userInformationStatus.value = 'failed'
    return
  }

  if (loadUserDataMachineState.value.hasTag("Loading user information")) {
    userInformationStatus.value = 'loading'
    return
  }

  userInformationStatus.value = 'success'
})

const userCartStatus = ref<StatusLabel | undefined>(undefined)
watchEffect(() => {
  if (loadUserDataMachineState.value.hasTag("Loading user cart failed")) {
    userCartStatus.value = 'failed'
    return
  }

  if (loadUserDataMachineState.value.hasTag("Loading user cart")) {
    userCartStatus.value = 'loading'
    return
  }

  userCartStatus.value = 'success'
})
</script>

<template>
  <main class="flex flex-col justify-start items-center mt-6">
    <!-- <div data-cy="machine-current-value">{{loadUserDataMachineState.value}}</div> -->
    <div class="flex flex-col">
      <template v-if="showLoadUserDataButton">
        <p>
        <h4>Will be downloaded:</h4>
        <ul class="list-disc">
          <li>
            User Information (id, name, email, etc.)
          </li>
          <li>
            User Cart (items, credit, etc.)
          </li>
        </ul>
        </p>
        <BaseButton @click="loadUserInformationButtonOnClick">
          Load user Data
        </BaseButton>
      </template>

      <template v-else>

        <LoadingSection v-bind:status="userInformationStatus" label="User Information" />

        <LoadingSection v-bind:status="userCartStatus" label="User Cart" />

        <template v-if="userInformationStatus === 'failed' || userCartStatus === 'failed'">
          <BaseButton @click="loadUserInformationButtonOnClick">
            Retry
          </BaseButton>
        </template>


        <template v-else-if="userInformationStatus ===  'success' && userCartStatus === 'success'">
          <span class="mb-2">Reached final state</span>
          <span class="mb-2">{{ loadUserDataMachineState.context.userInformation }}</span>
          <span class="mb-2">{{ loadUserDataMachineState.context.userCart }}</span>
          <BaseButton @click="sendResetContextToMachine">
            Reset the machine
          </BaseButton>
        </template>

      </template>


    </div>
  </main>
</template>
