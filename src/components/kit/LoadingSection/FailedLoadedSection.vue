<script setup lang="ts">
export interface BaseSectionProp {
  label: string;
}
const props = defineProps<BaseSectionProp>();
</script>

<template>
  <section
    class="bg-red-500 hover:bg-red-400 mb-2 w-fit inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white transition ease-in-out duration-150"
  >
    {{ `${props.label} failed` }}
  </section>
</template>
