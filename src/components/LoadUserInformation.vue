<script setup lang="ts">
import { createLoadUserDataInvokingPromises } from "@/machines/LoadUserDataWithPromiseMachine";
import { computed } from "vue";
import { useMachine } from "@xstate/vue";

const loadUserDataWithPromisesMachine = createLoadUserDataInvokingPromises();

const { send: sendToCounterMachine, state: loadUserDataMachineState } =
  useMachine(loadUserDataWithPromisesMachine);

function loadUserInformationButtonOnClick() {
  console.log("loadUserInformationButtonOnClick");
  sendToCounterMachine({
    type: "User pressed load user data button",
  });
}

function sendResetContextToMachine() {
  sendToCounterMachine({
    type: "User pressed reset machine button"
  })
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
  <main style="
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  ">
    <div data-cy="machine-current-value">{{loadUserDataMachineState.value}}</div>
    <div style="display: flex; flex-direction: column">
      <template v-if="showLoadUserDataButton">
        <button style="margin: auto" @click="loadUserInformationButtonOnClick">
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
            <template v-if="loadUserInformationFailed">
              <span>User Information Failed</span>
            </template>

            <template v-else>
              User Information Loading...
            </template>
          </template>
        </span>


        <span class="mb-12">
          <template v-if="finishedLoadingUserCart">
            User cart has been loaded
          </template>

          <template v-else>
            <template v-if="loadUserCartFailed">
              <span>User cart Failed</span>
            </template>

            <template v-else>
              User cart Loading...
            </template>
          </template>
        </span>

        <template v-if="loadUserInformationFailed || loadUserCartFailed">
          <button @click="loadUserInformationButtonOnClick">
            Retry
          </button>
        </template>

      </template>

      <template v-else>
        <span class="mb-12">Reached final state</span>
        <span class="mb-12">{{ loadUserDataMachineState.context.userInformation }}</span>
        <span class="mb-12">{{ loadUserDataMachineState.context.userCart }}</span>
        <button style="margin: auto" @click="sendResetContextToMachine">Reset the machine</button>
      </template>

    </div>
  </main>
</template>
