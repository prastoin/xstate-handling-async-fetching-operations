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
    <h1>x-state-handling-async-fetching-operations</h1>
  </header>
  <main>
    <LoadUserInformation />
  </main>
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