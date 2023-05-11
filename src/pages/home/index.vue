<template>
  <div class="page-wrap">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="feature" label="功能" width="180" />
      <el-table-column prop="topic" label="topic" width="280" />
      <el-table-column label="payload">
        <template #default="scope">
          <vue-json-pretty :data="scope.row.payload" :deep="1" />
        </template>
      </el-table-column>

      <el-table-column type="expand">
        <template #default="scope">
          <div m="4">
            <h4>测试功能:</h4>
            <el-form ref="formRef" :inline="true" :model="form" :rules="rules">
              <el-form-item label="productId: " prop="productId">
                <el-input v-model="form.productId" placeholder="生产id" clearable />
              </el-form-item>
              <el-form-item label="deviceId: " prop="deviceId">
                <el-input v-model="form.deviceId" placeholder="设备id" clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit(formRef, scope.row)">下发</el-button>
              </el-form-item>
            </el-form>
            <vue-json-pretty v-model:data="scope.row.payload" editable />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-input v-model="mqMsg" :rows="30" type="textarea" placeholder="Please input" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import { listData } from './listData'
import type { IItem } from './listData'
import type { FormInstance, FormRules } from 'element-plus'
import mqttClient from '@/mq/mqttClient'
import { useMqttStore } from '@/store/mqttStore'

const mqttStore = useMqttStore()

const tableData = reactive(listData)
const formRef = ref<FormInstance>()
const form = reactive({
  productId: 'shuili_test_product_id_001',
  deviceId: 'app_update'
})

const mqMsg = ref('')

watch(
  mqttStore.mqMsgObj,
  () => {
    mqMsg.value = JSON.stringify(mqttStore.mqMsgObj, null, 2)
  },
  {
    immediate: true
  }
)

const rules = reactive<FormRules>({
  productId: [
    {
      required: true,
      message: '请输入生产ID',
      trigger: 'blur'
    }
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  deviceId: [
    {
      required: true,
      message: '请输入设备ID',
      trigger: 'blur'
    }
  ]
})

const onSubmit = async (formEl: FormInstance | undefined, row: IItem) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(JSON.stringify(row.payload, null, 2))
      const topic = row.topic
        .replace('{productId}', form.productId)
        .replace('{deviceId}', form.deviceId)
      const payload = row.payload
      mqttClient.publish(topic, payload)
    }
  })
}
</script>
<style scoped>
.page-wrap {
  width: 1000px;
  margin: 0 auto;
  height: auto;
}
</style>
