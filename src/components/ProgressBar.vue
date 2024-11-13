<template>
  <div class="flex items-center justify-between mb-8">
    <div
      v-for="(step, index) in STEPS"
      :key="index"
      class="flex items-center relative"
    >
      <!-- Connector line -->
      <div
        v-if="index > 0"
        class="h-0.5 w-24 mx-6"
        :class="index < currentStep ? 'bg-primary' : 'bg-gray-200'"
      ></div>
      
      <!-- Step indicator -->
      <div class="flex items-center">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          :class="getStepClass(index)"
        >
          <template v-if="index < currentStep">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </template>
          <template v-else-if="index === currentStep">
            <span class="text-white">{{ index + 1 }}</span>
          </template>
          <template v-else>
            <span class="text-white">{{ index + 1 }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { STEPS } from '../constants/config'

const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  }
})

const getStepClass = (index) => {
  if (index < props.currentStep) {
    return 'bg-primary'
  }
  if (index === props.currentStep) {
    return 'bg-primary'
  }
  return 'bg-gray-300'
}
</script>