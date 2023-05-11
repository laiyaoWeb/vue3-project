import { IClientOptions } from 'mqtt/types/lib/client-options'

export const clientOptions: IClientOptions = {
  port: 9001,
  clientId: 'mqttx_' + Math.random().toString(36).substr(2, 10),
  username: 'root',
  password: 'admin',
  clean: true
}

export const mqttUrl = `ws://192.168.3.4`
