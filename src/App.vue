<template>
  <header>
    <h1>x-state-handling-async-fetching-operations</h1>
  </header>
  <main>
    <div>
      <button @click="decreaseCounter">-</button>
      <span>{{ counter }}</span>
      <button @click="increaseCounter">+</button>
    </div>
  </main>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const counter = ref<number>(10);

    const decreaseCounter = () => {
      counter.value--;
    };

    const increaseCounter = () => {
      counter.value++;
    };

    return {
      counter,
      increaseCounter,
      decreaseCounter,
    };
  },
};
</script>
