<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Welcome Nestor
        </h1>
        <p class="mt-2 text-lg text-gray-600">
          How can we help you?
        </p>
        <p class="mt-4 text-xl font-semibold text-primary">
          {{ store.currentStepName }}
        </p>
      </header>

      <ProgressBar />

      <main class="mt-8">
        <component :is="currentComponent" />
      </main>

      <!-- Navigation Buttons -->
      <div v-if="store.step > 0 && !store.reportGenerated" class="mt-8 flex justify-between">
        <button
          @click="store.previousStep"
          class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        
        <button
          v-if="showNextButton"
          @click="store.nextStep"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          :disabled="!store.canProceedToNextStep"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '~/stores/main'

const store = useMainStore()

const currentComponent = computed(() => {
  switch (store.step) {
    case 0:
      return resolveComponent('TaskSelection')
    case 1:
      return resolveComponent('DocumentSettings')
    case 2:
      return resolveComponent('StyleSelection')
    case 3:
      return resolveComponent('FileUploader')
    case 4:
      return resolveComponent('ReportGeneration')
    default:
      return null
  }
})

const showNextButton = computed(() => {
  // No mostrar el botón Next en el último paso
  if (store.step === 4) return false
  // No mostrar el botón Next cuando se selecciona "Default settings"
  if (store.step === 1 && store.documentSetting === "Default settings") return false
  return true
})
</script>