import { defineStore } from 'pinia'
import { STEPS } from '../constants/config'

export const useMainStore = defineStore('main', {
  state: () => ({
    step: 0,
    taskSelection: null,
    reportTitle: '',
    reportSubtitle: '',
    documentSetting: null,
    selectedStyle: null,
    uploadedFiles: null,
    reportGenerated: false,
    customSettings: {
      tableOfContents: true,
      executiveSummary: true,
      introduction: true,
      technologyAnalysis: true,
      marketAnalysis: true,
      conclusion: true
    }
  }),

  getters: {
    canProceedToNextStep: (state) => {
      switch (state.step) {
        case 0:
          return state.taskSelection && state.reportTitle && state.reportSubtitle
        case 1:
          return state.documentSetting !== null
        case 2:
          return state.selectedStyle !== null
        case 3:
          return state.uploadedFiles && state.uploadedFiles.directory && state.uploadedFiles.files.length > 0
        default:
          return false
      }
    }
  },

  actions: {
    updateTask(task, title, subtitle) {
      this.taskSelection = task
      this.reportTitle = title
      this.reportSubtitle = subtitle
    },
    
    updateDocumentSettings(setting, customSettings) {
      this.documentSetting = setting
      if (customSettings) {
        this.customSettings = customSettings
      }
    },

    nextStep() {
      if (this.canProceedToNextStep && this.step < STEPS.length - 1) {
        this.step++
      }
    },

    previousStep() {
      if (this.step > 0) {
        this.step--
      }
    },

    resetState() {
      this.$reset()
    }
  }
})