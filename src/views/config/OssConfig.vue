<template>
  <a-row>
    <a-col :span="16">
      <a-card title="文件存储配置">
        <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <a-form-item label="存储类型">
            <a-radio-group v-decorator="['ossType',{rules: [{required: true, message:'请输入名称'}]}]">
              <a-radio value="tencent">腾讯OSS</a-radio>
              <a-radio value="qiniu">七牛OSS</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Bucket">
            <a-input v-decorator="['bucket',{rules: [{required: true, message:'请输入名称'}]}]"/>
          </a-form-item>
          <a-form-item label="Region">
            <a-input v-decorator="['regionName',{rules: [{required: true, message:'请输入名称'}]}]"/>
          </a-form-item>
          <a-form-item label="AccessKey">
            <a-input v-decorator="['appKey',{rules: [{required: true, message:'请输入名称'}]}]"/>
          </a-form-item>
          <a-form-item label="SecretKey">
            <a-textarea :rows="2" v-decorator="['appSecret',{rules: [{required: true, message:'请输入名称'}]}]"/>
          </a-form-item>
          <a-form-item :wrapperCol="{offset:4}">
            <a-button type="primary" @click="handleSubmit">保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { saveConfig, getConfig } from '@/api/manage'

export default {
  name: 'BaseConfig',
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  props: {
    biz: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  methods: {
    show () {
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          saveConfig({
            configName: '存储配置',
            configType: 'WEB_CONFIG',
            configKey: 'OSS',
            configContent: JSON.stringify(values)
          }).then(() => {
            this.$message.info('保存成功')
          })
        }
      })
    }
  },
  mounted () {
    getConfig('WEB_CONFIG', 'OSS').then(res => {
      this.$nextTick(() => {
        this.form.setFieldsValue(JSON.parse(res.data))
      })
    })
  }
}
</script>

<style scoped>
 .monaco-editor {
  width: 100%;
  height: 100%;
  min-height: 350px;
 }
</style>
