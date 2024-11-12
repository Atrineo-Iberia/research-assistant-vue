<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <select
        v-model="selectedStyle"
        class="w-full p-3 border rounded-lg bg-white"
        :class="{ 'border-primary': selectedStyle }"
      >
        <option value="" disabled selected>Select style...</option>
        <option v-for="style in STYLE_OPTIONS" :key="style" :value="style">
          {{ style }}
        </option>
      </select>
    </div>

    <div v-if="selectedStyle" class="border rounded-lg p-6">
      <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p class="text-gray-500">Preview for {{ selectedStyle }} style</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMainStore } from '~/stores/main'
import { STYLE_OPTIONS } from '~/constants/config'

const store = useMainStore()
const selectedStyle = ref('')

watch(selectedStyle, (style) => {
  if (style) {
    store.selectedStyle = style
    store.nextStep()
  }
})
</script>