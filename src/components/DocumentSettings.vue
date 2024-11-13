<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <select
        v-model="selectedSetting"
        class="w-full p-3 border rounded-lg bg-white"
        :class="{ 'border-primary': selectedSetting }"
      >
        <option value="" disabled selected>Select settings...</option>
        <option v-for="setting in DOCUMENT_SETTINGS" :key="setting" :value="setting">
          {{ setting }}
        </option>
      </select>
      <p class="text-xs text-gray-500">
        Change me to explain the differences between default settings and custom settings
      </p>
    </div>

    <div v-if="selectedSetting === 'Custom settings'" class="border rounded-lg p-6">
      <h3 class="text-lg font-medium mb-4">
        Select the sections you would like to generate in the document:
      </h3>
      <div class="space-y-4">
        <div v-for="(value, key) in settings" :key="key" class="flex items-center">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="settings[key]"
              class="hidden peer"
            />
            <div class="w-4 h-4 border-2 border-gray-300 rounded-lg flex items-center justify-center peer-checked:bg-primary">
              <svg
                v-if="settings[key]"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
              </svg>
            </div>
            <span class="text-gray-700">{{ formatKey(key) }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMainStore } from '../stores/main'
import { DOCUMENT_SETTINGS } from '../constants/config'

const store = useMainStore()
const selectedSetting = ref('')
const settings = ref({
  tableOfContents: true,
  executiveSummary: true,
  introduction: true,
  technologyAnalysis: true,
  marketAnalysis: true,
  conclusion: true
})

const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

watch([selectedSetting, settings], ([setting, newSettings], [oldSetting]) => {
  if (setting === 'Default settings') {
    store.updateDocumentSettings(setting)
    store.nextStep()
  } else if (setting === 'Custom settings' && oldSetting !== setting) {
    store.updateDocumentSettings(setting, newSettings)
  }
})
</script>