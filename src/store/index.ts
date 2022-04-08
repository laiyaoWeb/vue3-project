import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: 'state'
  }),
  getters: {
    nameLength: (state) => state.name.length
  }
})
