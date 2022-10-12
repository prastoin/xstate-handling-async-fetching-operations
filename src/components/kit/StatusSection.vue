<script setup lang="ts">
import type { StatusLabel } from "@/type";
import FailedLoadedSection from "./LoadingSection/FailedLoadedSection.vue";
import SuccessfullyLoadedSection from "./LoadingSection/SuccessfullyLoadedSection.vue";
import LoadingSection from "./LoadingSection/LoadingSection.vue";

export interface BaseSectionProp {
  status: StatusLabel;
  label: string;
  testId: string;
}
const props = defineProps<BaseSectionProp>();
</script>

<template>
  <div v-bind:testId="props.testId">
    <LoadingSection v-if="props.status === 'loading'" :label="props.label" />
    <SuccessfullyLoadedSection
      v-else-if="props.status === 'success'"
      :label="props.label"
    />
    <FailedLoadedSection
      v-else-if="props.status === 'failed'"
      :label="props.label"
    />
  </div>
</template>
