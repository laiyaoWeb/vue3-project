// @ts-ignore
import * as mqtt from 'mqtt/dist/mqtt.min'
import { clientOptions, mqttUrl } from '@/config/mqttConfig'
import { useMqttStore } from '@/store/mqttStore'

type OnMessageFunc = (topic: string, payload: Buffer) => void

class MqttClient {
  private mqClient: mqtt.MqttClient
  private static instance: any

  constructor() {
    this.init()
  }

  init() {
    this.mqClient = mqtt.connect(mqttUrl, clientOptions)
    this.addEventListener()
    this.subscribe('root/device/#')
  }

  addEventListener() {
    this.mqClient.on('connect', this.onConnect.bind(this))
    this.mqClient.on('message', this.onMessage.bind(this))
    this.mqClient.on('error', this.onError.bind(this))
  }

  static getInstance(): MqttClient {
    if (!MqttClient.instance) {
      MqttClient.instance = new MqttClient()
    }
    return MqttClient.instance
  }

  onConnect() {
    console.log('Connected to mqtt server url: ' + mqttUrl)
  }

  onMessage(topic: string, payload: any) {
    if (Object.prototype.toString.call(payload) === '[object Uint8Array]') {
      payload = String.fromCharCode.apply(null, [...new Uint16Array(payload)])
    }
    console.log('topic: ' + topic)
    console.log('Received message: ', payload.toString())
    const mqttStore = useMqttStore()
    mqttStore.mqMsgObj[topic] = payload
  }

  onError(err: Error) {
    console.error('mqtt error: ' + err)
  }

  public subscribe(topic: string, qos = 0) {
    this.mqClient.subscribe(topic, { qos })
  }

  public publish(topic: string, message: any, qos: 0 | 1 | 2 = 0) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }
    console.log('publish topic: ' + topic)
    console.log('publish message: ' + message)
    this.mqClient.publish(topic, message, { qos, retain: false })
  }
}
const mqttClient = MqttClient.getInstance()
export default mqttClient
