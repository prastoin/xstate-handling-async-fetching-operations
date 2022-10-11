<script setup lang="ts">
import { computed } from "vue";

export type StatusLabel = "loading" | "failed" | "success";
export interface BaseSectionProp {
  status: StatusLabel;
  label: string;
  testId: string;
}
const props = defineProps<BaseSectionProp>();

function getSectionStyleToApply(status?: StatusLabel) {
  switch (status) {
    case "failed": {
      return "bg-red-500 hover:bg-red-400";
    }
    case "loading": {
      return "bg-indigo-500 hover:bg-indigo-400";
    }
    case "success": {
      return "bg-green-500 hover:bg-green-400";
    }
    default: {
      throw new Error("Encountered unknown status value");
    }
  }
}
const styleToApply = computed(() => getSectionStyleToApply(props.status));
</script>

<template>
  <section
    v-bind:data-cy="`${props.testId}-loading-container`"
    v-bind:class="styleToApply"
    class="mb-2 w-fit inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white transition ease-in-out duration-150"
  >
    <svg
      v-if="props.status === 'loading'"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    {{ `${props.label} ${props.status}` }}
  </section>
</template>
