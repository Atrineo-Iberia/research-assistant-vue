<template>
  <div class="space-y-6">
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        ref="fileInput"
        multiple
        class="hidden"
        @change="handleFileSelect"
        :accept="acceptedFileTypes"
      />
      
      <div class="space-y-4">
        <div class="flex justify-center">
          <DocumentArrowUpIcon class="w-12 h-12 text-gray-400" />
        </div>
        <div>
          <button
            @click="$refs.fileInput.click()"
            class="text-primary hover:text-primary-dark font-medium"
          >
            Upload files
          </button>
          <span class="text-gray-500"> or drag and drop</span>
        </div>
        <p class="text-sm text-gray-500">
          Supported file types: {{ FILE_TYPES.join(', ') }}
        </p>
      </div>
    </div>

    <div v-if="files.length > 0" class="space-y-4">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="flex items-center justify-between p-4 bg-white rounded-lg border"
      >
        <div class="flex items-center space-x-4">
          <DocumentIcon class="w-6 h-6 text-gray-400" />
          <div>
            <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
            <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
          </div>
        </div>
        <button
          @click="removeFile(index)"
          class="text-gray-400 hover:text-red-500"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <button
        @click="handleUpload"
        class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-[#042d47] transition-colors"
      >
        Continue with {{ files.length }} file{{ files.length > 1 ? 's' : '' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DocumentArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/vue/24/outline'  
import { useMainStore } from '../stores/main'
import { FILE_TYPES } from '../constants/config'

const store = useMainStore()
const files = ref([])
const acceptedFileTypes = FILE_TYPES.map(type => `.${type}`).join(',')

const handleFileSelect = (event) => {
  const newFiles = Array.from(event.target.files)
  files.value = [...files.value, ...newFiles]
}

const handleDrop = (event) => {
  const newFiles = Array.from(event.dataTransfer.files)
  files.value = [...files.value, ...newFiles]
}

const removeFile = (index) => {
  files.value.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleUpload = async () => {
  // Crear un directorio temporal para los archivos
  const formData = new FormData()
  files.value.forEach(file => {
    formData.append('files', file)
  })

  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(`${apiUrl}/upload-files`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Failed to upload files')
    }

    const { directory } = await response.json()
    
    // Guardamos la referencia al directorio en el store
    store.uploadedFiles = {
      directory,
      files: files.value.map(f => ({ 
        name: f.name, 
        size: f.size 
      }))
    }
    store.nextStep()
  } catch (error) {
    console.error('Error uploading files:', error)
    // Aquí deberíamos mostrar un error al usuario
  }
}
</script>