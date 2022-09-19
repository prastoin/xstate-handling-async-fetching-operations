<script setup lang="ts">
import { createLoadUserInformationMachine } from "@/machines/LoadUserInformationMachine";
import { computed } from "vue";
import { useMachine } from "@xstate/vue";

const loadUserInformationMachine = createLoadUserInformationMachine();

const { send: sendToCounterMachine, state: loadUserInformationState } =
  useMachine(loadUserInformationMachine);

function loadUserInformationButtonOnClick() {
  console.log("loadUserInformationButtonOnClick");
  sendToCounterMachine({
    type: "User pressed load user data button",
  });
}

const isLoading = computed(
  () =>
    loadUserInformationState.value.hasTag("Currently loading")
);
const showLoadUserInformationButton = computed(
  () =>
    loadUserInformationState.value.value === "Idle" ||
    loadUserInformationState.value.value === "Loading user information failed"
);
</script>

<template>
  <div class="flex flex-col">
    <template v-if="showLoadUserInformationButton">
      <span>{{ loadUserInformationState.value }}</span>
      <button @click="loadUserInformationButtonOnClick">
        Load user information
      </button>
    </template>
    <template v-else-if="isLoading">
      <span>{{ loadUserInformationState.value }}</span>
      <span>Loading...</span>
    </template>
    <template v-else>
      <span class="mb-12">{{ loadUserInformationState.value }}</span>
      <span class="mb-12">{{ loadUserInformationState.context.userInformation }}</span>
      <span class="mb-12">{{ loadUserInformationState.context.userCart }}</span>
    </template>
  </div>
</template>
