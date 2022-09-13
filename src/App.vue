<template>
  <header>
    <h1>x-state-handling-async-fetching-operations</h1>
  </header>
  <main>
    <div>
      <button @click="decreaseCounterButtonOnClick">-</button>
      <span>{{ counterMachineState.context.counter }}</span>
      <button @click="increaseCounterButtonOnClick">+</button>
    </div>
  </main>
</template>

<script lang="ts">
import { useMachine } from '@xstate/vue';
import { createCounterMachine } from './machines/CounterMachine';

const counterMachine = createCounterMachine();

export default {
  setup() {
    const { send: sendToCounterMachine, state: counterMachineState } = useMachine(counterMachine)

    function decreaseCounterButtonOnClick() {
      sendToCounterMachine({
        type: 'User pressed descrease button'
      })
    }

    function increaseCounterButtonOnClick() {
      sendToCounterMachine({
        type: 'User pressed increase button'
      })
    }

    // why does counterMachineState.context doesn't seem to exist here but does inside the vue template ?
    console.log(counterMachineState.value)
    return {
      decreaseCounterButtonOnClick,
      increaseCounterButtonOnClick,
      counterMachineState
    }
  },
};
</script>
