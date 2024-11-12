<template>
  <div class="space-y-6">
    <div v-if="!reportGenerated" class="space-y-4">
      <div class="p-6 bg-white rounded-lg border">
        <div class="space-y-4">
          <div v-for="(step, index) in STEPS" :key="index" class="flex items-center">
            <span class="mr-3">
              <template v-if="currentStepIndex > index">
                <CheckCircleIcon class="w-6 h-6 text-green-500" />
              </template>
              <template v-else-if="currentStepIndex === index">
                <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </template>
              <template v-else>
                <div class="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              </template>
            </span>
            <span :class="{ 'text-primary font-medium': currentStepIndex === index }">
              {{ step }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center space-x-3">
          <CheckCircleIcon class="w-6 h-6 text-green-500" />
          <span class="text-green-700 font-medium">Report generated successfully!</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <a
          :href="pdfPath"
          download
          class="flex items-center justify-center p-4 bg-white border rounded-lg hover:bg-gray-50"
        >
          <DocumentArrowDownIcon class="w-5 h-5 mr-2" />
          Download PDF
        </a>
        <a
          :href="docxPath"
          download
          class="flex items-center justify-center p-4 bg-white border rounded-lg hover:bg-gray-50"
        >
          <DocumentArrowDownIcon class="w-5 h-5 mr-2" />
          Download DOCX
        </a>
      </div>

      <button
        @click="createAnotherReport"
        class="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Create another report
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
//import { CheckCircleIcon, DocumentArrowDownIcon } from '@heroicons/vue/24/solid'
import { useMainStore } from '../stores/main'
import { STEPS } from '../constants/config'

const store = useMainStore()
const currentStepIndex = ref(0)
const reportGenerated = ref(false)
const pdfPath = ref('')
const docxPath = ref('')

const generateReport = async () => {
  try {
    console.log('Starting report generation...')
    console.log('Store state:', {
      uploadedFiles: store.uploadedFiles,
      settings: store.customSettings,
      title: store.reportTitle,
      subtitle: store.reportSubtitle
    })

    const formData = new FormData()
    formData.append('directory', store.uploadedFiles.directory)
    formData.append('settings', JSON.stringify(store.customSettings))
    formData.append('title', store.reportTitle)
    formData.append('subtitle', store.reportSubtitle)

    const apiUrl = import.meta.env.VITE_API_URL
    console.log('Sending request to generate-report endpoint...')
    const response = await fetch(`${apiUrl}/generate-report`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Server error:', errorText)
      throw new Error('Failed to generate report')
    }

    console.log('Report generated successfully')
    const { pdf_url, docx_url } = await response.json()
    console.log('Received paths:', { pdf_url, docx_url })
    
    pdfPath.value = pdf_url
    docxPath.value = docx_url
    reportGenerated.value = true
  } catch (error) {
    console.error('Error generating report:', error)
  }
}

const createAnotherReport = () => {
  store.resetState()
}

onMounted(async () => {
  for (let i = 0; i < STEPS.length; i++) {
    currentStepIndex.value = i
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  await generateReport()
})
</script>