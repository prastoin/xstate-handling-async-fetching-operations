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

    <section class="flex flex-col">
      <small
        >See related
        <a
          class="underline"
          href="http://paul.rastoin.dev/writing/posts/xstate-handling-async-operations"
          >Article</a
        >
      </small>

      <small>
        Check the code on
        <a
          class="underline"
          href="https://github.com/prastoin/xstate-handling-async-fetching-operations"
        >
          GitHub
        </a>
      </small>
    </section>
  </header>
  <LoadUserData />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
