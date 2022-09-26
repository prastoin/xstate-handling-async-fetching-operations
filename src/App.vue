<script lang="ts">
import LoadUserInformation from "./components/LoadUserInformation.vue";

export default {
  setup() {
    return {};
  },
  components: { LoadUserInformation },
};
</script>

<template>
  <header class="mb-6">
    <h1 className="text-3xl font-bold underline">XState handling async operations invoking Promises</h1>
    <small>See related <a className="underline"
        href="https://xstate.js.org/docs/guides/communication.html#invoking-promises">Documentation</a></small>
  </header>
  <LoadUserInformation />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>