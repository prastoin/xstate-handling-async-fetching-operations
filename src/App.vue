<script lang="ts">
import LoadUserData from "./components/LoadUserData.vue";

export default {
  setup() {
    return {};
  },
  components: { LoadUserData },
};
</script>

<template>
  <header class="mb-6">
    <h1 class="text-3xl font-bold underline">
      XState handling async operations invoking Promises
    </h1>
    <small
      >See related
      <a
        class="underline"
        href="https://xstate.js.org/docs/guides/communication.html#invoking-promises"
        >Documentation</a
      ></small
    >
  </header>
  <LoadUserData />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
