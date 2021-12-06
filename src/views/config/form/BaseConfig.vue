<template>
  <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="网站名称">
      <a-input v-decorator="['webName',{rules: [{required: true,message:'请输入名称'}]}]"/>
    </a-form-item>
    <a-form-item :wrapperCol="{offset:3}">
      <a-button type="primary" @click="handleSubmit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { saveConfig } from '@/api/manage'

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
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          saveConfig({
            config_name: '网站配置',
            config_type: 'BASE',
            config_key: 'BASE',
            config_content: values.webName
          }).then(() => {
            this.$message.info('保存成功')
          })
        }
      })
    }
  },
  mounted () {
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
