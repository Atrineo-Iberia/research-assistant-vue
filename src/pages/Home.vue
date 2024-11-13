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
        <p class="mt-4 text-xl font-semibold text-[#053A5A]">
          {{ STEPS[store.step] }}
        </p>
      </header>

      <ProgressBar :current-step="store.step" />

      <main class="mt-8">
        <component :is="currentComponent" />
      </main>

      <!-- Navigation Buttons -->
      <div v-if="store.step > 0 && !store.reportGenerated" class="mt-8 flex justify-between">
        <button
          @click="store.previousStep"
          class="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        <button
          @click="store.nextStep"
          class="px-6 py-2.5 bg-[#053A5A] text-white rounded-lg hover:bg-[#042d47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!store.canProceedToNextStep"
        >
          {{ store.step === 3 ? 'Generate Report' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '../stores/main'

import { STEPS } from '../constants/config'

import ProgressBar from '../components/ProgressBar.vue'
import TaskSelection from '../components/TaskSelection.vue'
import DocumentSettings from '../components/DocumentSettings.vue'
import StyleSelection from '../components/StyleSelection.vue'
import FileUploader from '../components/FileUploader.vue'
import ReportGeneration from '../components/ReportGeneration.vue'

const store = useMainStore()

const currentComponent = computed(() => {
  switch (store.step) {
    case 0:
      return TaskSelection
    case 1:
      return DocumentSettings
    case 2:
      return StyleSelection
    case 3:
      return FileUploader
    case 4:
      return ReportGeneration
    default:
      return null
  }
})

const showNextButton = computed(() => {
  if (store.step === 4) return false
  if (store.step === 1 && store.documentSetting === "Default settings") return false
  return true
})
</script>