import { defineStore } from 'pinia'

type IMqMsgObj = Record<string, any>

export const useMqttStore = defineStore({
  id: 'mqttStore',
  state: () => ({
    mqMsgObj: {} as IMqMsgObj
  }),
  persist: {
    key: 'mqttStore',
    storage: window.localStorage
  }
})
