export interface IItem {
  feature: string
  topic: string
  payload: any
}

export const listData: IItem[] = [
  {
    feature: '读取OTA版本信息',
    topic: '/{productId}/{deviceId}/ota/read',
    payload: {
      timestamp: 1601196762389,
      messageId: '1111',
      version: '1.0',
      params: [
        {
          module: 'app' // 模块 app:代表程序  firmware:代表固件
        },
        {
          module: 'firmwar'
        }
      ]
    }
  },
  {
    feature: 'ota更新检查',
    topic: '/{productId}/{deviceId}/ota/check',
    payload: {
      timestamp: 1601196762389,
      messageId: '2222',
      version: '1.0',
      parameters: {
        module: 'app', // ota模块
        version: '1.0.1',
        extVersion: 2, // 可选 类型为固件的时候携带
        compatible: ['1.1', '1.2'] // 兼容版本号,可选,类型为程序的时候携带
      }
    }
  },
  {
    feature: 'ota更新推送',
    topic: '/{productId}/{deviceId}/ota/upgrade',
    payload: {
      timestamp: 1601196762389, // 毫秒时间戳
      version: 'oat版本号',
      parameters: {
        module: 'app', // ota模块
        url: 'http://192.168.3.2:8080/entry-default-signed.hap',
        sign: '5DBAFBA2D38E03A30DBF8B3EC6CBF9D1',
        signMethod: 'md5',
        size: 100000, // 文件大小
        compatible: ['1.1', '1.2'] // 兼容版本号
      }
    }
  }
]
