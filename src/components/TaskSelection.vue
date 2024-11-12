<template>
  <div class="space-y-6">
    <select
      v-model="selectedTask"
      class="w-full p-3 border rounded-lg bg-white"
      :class="{ 'border-primary': selectedTask }"
    >
      <option value="" disabled selected>Select task...</option>
      <option v-for="task in TASK_OPTIONS" :key="task" :value="task">
        {{ task }}
      </option>
    </select>

    <div v-if="selectedTask" class="border rounded-lg p-6 space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Report Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Enter the title of your report..."
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-primary': title }"
        />
        <p class="text-xs text-gray-500">This will be the main title of your report</p>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Subtitle</label>
        <input
          v-model="subtitle"
          type="text"
          placeholder="Enter the subtitle of your report..."
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-primary': subtitle }"
        />
        <p class="text-xs text-gray-500">This will appear in the cover page</p>
      </div>

      <button
        @click="handleNext"
        :disabled="!canProceed"
        class="w-full mt-4 py-2 px-4 bg-red-200 text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '../stores/main'
import { TASK_OPTIONS } from '../constants/config'

const store = useMainStore()
const selectedTask = ref('')
const title = ref('')
const subtitle = ref('')

const canProceed = computed(() => {
  return selectedTask.value && title.value && subtitle.value
})

const handleNext = () => {
  if (canProceed.value) {
    store.updateTask(selectedTask.value, title.value, subtitle.value)
    store.nextStep()
  }
}
</script>