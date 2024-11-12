<template>
  <div class="flex items-center justify-between">
    <div
      v-for="(step, index) in STEPS"
      :key="index"
      class="flex items-center"
    >
      <!-- Línea conectora -->
      <div
        v-if="index > 0"
        class="h-1 w-16 mx-2"
        :class="index <= currentStep ? 'bg-primary' : 'bg-gray-200'"
      ></div>
      
      <!-- Indicador de paso -->
      <div class="flex items-center">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center"
          :class="getStepClass(index)"
        >
          <template v-if="index < currentStep">
            <CheckIcon class="w-5 h-5 text-white" />
          </template>
          <template v-else-if="index === currentStep">
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </template>
          <template v-else>
            <span class="text-white text-sm">{{ index + 1 }}</span>
          </template>
        </div>
        <span
          class="ml-2 text-sm"
          :class="index === currentStep ? 'text-primary font-medium' : 'text-gray-500'"
        >
          {{ step }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
import { STEPS } from '~/constants/config'

const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  }
})

const getStepClass = (index) => {
  if (index < props.currentStep) {
    return 'bg-green-500'
  }
  if (index === props.currentStep) {
    return 'bg-primary'
  }
  return 'bg-gray-300'
}
</script>