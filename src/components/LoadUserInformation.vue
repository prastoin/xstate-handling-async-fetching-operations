<script setup lang="ts">
import { createLoadUserInformationMachine } from "@/machines/LoadUserInformationMachine";
import { computed } from "vue";
import { useMachine } from "@xstate/vue";

const loadUserInformationMachine = createLoadUserInformationMachine();

const { send: sendToCounterMachine, state: loadUserDataMachineState } =
  useMachine(loadUserInformationMachine);

function loadUserInformationButtonOnClick() {
  console.log("loadUserInformationButtonOnClick");
  sendToCounterMachine({
    type: "User pressed load user data button",
  });
}

const isLoading = computed(
  () =>
    loadUserDataMachineState.value.hasTag("Currently loading")
);
const showLoadUserDataButton = computed(
  () =>
    loadUserDataMachineState.value.value === "Idle" ||
    loadUserDataMachineState.value.value === "Loading user information failed"
);

const loadUserCartFailed = computed(() => loadUserDataMachineState.value.hasTag("Loading user cart failed"))
const loadUserInformationFailed = computed(() => loadUserDataMachineState.value.hasTag("Loading user information failed"))
const finishedLoadingUserInformation = computed(() => loadUserDataMachineState.value.hasTag("Finished loading user information"))
const finishedLoadingUserCart = computed(() => loadUserDataMachineState.value.hasTag("Finished loading user cart"))
</script>

<template>
  <div class="flex flex-col">
    <template v-if="showLoadUserDataButton">
      <button @click="loadUserInformationButtonOnClick">
        Load user Data
      </button>
      <p>
      <h4>Will be downloaded:</h4>
      <ul>
        <li>
          User Information (id, name, email, etc.)
        </li>
        <li>
          User Cart (items, credit, etc.)
        </li>
      </ul>
      </p>
    </template>

    <template v-else-if="isLoading">

      <span class="mb-12">
        <template v-if="finishedLoadingUserInformation">
          User Information have been loaded
        </template>
        <template v-else>
          User Information {{loadUserInformationFailed ? "Failed" : "Loading..." }}
        </template>
      </span>


      <span class="mb-12">
        <template v-if="finishedLoadingUserCart">
          User cart has been loaded
        </template>
        <template v-else>
          User Cart {{loadUserCartFailed ? "Failed" : "Loading..." }}
        </template>
      </span>

      <span>
      </span>
    </template>

    <template v-else>
      <span class="mb-12">Reached final state</span>
      <span class="mb-12">{{ loadUserDataMachineState.context.userInformation }}</span>
      <span class="mb-12">{{ loadUserDataMachineState.context.userCart }}</span>
    </template>

  </div>
</template>
