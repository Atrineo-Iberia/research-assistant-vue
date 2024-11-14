import axios from 'axios'

const API_BASE_URL = 'https://research-assistant-backenduvicorn-main.onrender.com'

export const uploadFiles = async (files) => {
  const formData = new FormData()
  files.forEach(file => {
    formData.append('files', file)
  })

  try {
    const response = await axios.post(`${API_BASE_URL}/api/upload-files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error uploading files:', error)
    throw error
  }
}