import axios from 'axios'

const API_BASE_URL = 'https://research-assistant-backenduvicorn-main.onrender.com'

// Crear una instancia de axios con la configuración base
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,  // Cambiado a false
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  }
})

export const uploadFiles = async (files) => {
  const formData = new FormData()
  files.forEach(file => {
    formData.append('files', file)
  })

  try {
    const response = await axiosInstance.post('/api/upload-files', formData)
    return response.data
  } catch (error) {
    console.error('Error uploading files:', error)
    throw error
  }
}