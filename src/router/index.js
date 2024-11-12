import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import TaskSelection from '../components/TaskSelection.vue'
import DocumentSettings from '../components/DocumentSettings.vue'
import StyleSelection from '../components/StyleSelection.vue'
import FileUploader from '../components/FileUploader.vue'
import ReportGeneration from '../components/ReportGeneration.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/task-selection',
    name: 'TaskSelection',
    component: TaskSelection
  },
  {
    path: '/document-settings',
    name: 'DocumentSettings',
    component: DocumentSettings
  },
  {
    path: '/style-selection',
    name: 'StyleSelection',
    component: StyleSelection
  },
  {
    path: '/file-upload',
    name: 'FileUploader',
    component: FileUploader
  },
  {
    path: '/report-generation',
    name: 'ReportGeneration',
    component: ReportGeneration
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router