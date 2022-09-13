<template>
    <div v-if="showLoadUserInformationButton">
        <span>{{ loadUserInformationState.value }}</span>
        <button @click="loadUserInformationButtonOnClick">Load user information</button>
    </div>
    <div v-else-if="isLoading">
        <span>{{ loadUserInformationState.value }}</span>
        <span>Loading...</span>
    </div>
    <div v-else>
        <span>{{ loadUserInformationState.value }}</span>
        <span>{{ loadUserInformationState.context.userInformation }}</span>
    </div>

</template>
  
<script setup lang="ts">
import { createLoadUserInformationMachine } from '@/machines/LoadUserInformationMachine';
import { computed } from '@vue/reactivity';
import { useMachine } from '@xstate/vue';

const loadUserInformationMachine = createLoadUserInformationMachine();

const { send: sendToCounterMachine, state: loadUserInformationState } = useMachine(loadUserInformationMachine)

function loadUserInformationButtonOnClick() {
    console.log("loadUserInformationButtonOnClick")
    sendToCounterMachine({
        type: 'User pressed load user information button'
    })
}

const isLoading = computed(() => loadUserInformationState.value.value === "Loading user information from server")
const showLoadUserInformationButton = computed(() => loadUserInformationState.value.value === "Idle" || loadUserInformationState.value.value === "Loading user information failed")

</script>
  