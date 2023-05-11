import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: 'state',
    isDark: false
  }),
  getters: {
    nameLength: (state) => state.name.length
  }
})
