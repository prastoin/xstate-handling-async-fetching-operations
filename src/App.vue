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
  <header class="mb-12">
    <h1>XState handling async operations invoking Promises</h1>
    <small>See related <a
        href="https://xstate.js.org/docs/guides/communication.html#invoking-promises">Documentation</a></small>
  </header>
  <LoadUserInformation />
</template>

<style>
.flex {
  display: flex
}

.m-auto {
  margin: auto
}

.justify-center {
  justify-content: center
}

.flex-col {
  flex-direction: column;
  align-items: center;
}

.p-12 {
  padding: 12px;
}

.mb-12 {
  margin-bottom: 12px
}
</style>