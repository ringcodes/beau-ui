<template>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 14 }">
      <a-form-item v-show="false">
        <a-input v-decorator="['biz', {initialValue:biz}]"/>
      </a-form-item>
      <a-form-item v-show="false">
        <a-input v-decorator="['id']"/>
      </a-form-item>
      <a-form-item label="APPID">
        <a-input v-decorator="['clientId',{rules: [{required: true,message:'请输入名称'}]}]"/>
      </a-form-item>
      <a-form-item label="Secret">
        <a-textarea v-decorator="['secret',{rules: [{required: true,message:'请输入内容'}]}]" rows="8"/>
      </a-form-item>
      <a-form-item label="回调地址">
        <a-input  v-decorator="['callback',{rules: [{required: true,message:'请输入内容'}]}]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{offset:3}">
        <a-button type="primary" @click="handleSubmit">保存</a-button>
      </a-form-item>
    </a-form>
</template>

<script>
import { Form, Input, Spin, Select } from 'ant-design-vue'
import { saveOauth, getOauth } from '@/api/manage'

export default {
  name: 'OauthConfigForm',
  data () {
    return {
      confirmLoading: false,
      title: '角色编辑',
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      configType: []
    }
  },
  props:{
    biz: {
      type: String
    }
  },
  components: {
    ASpin: Spin,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea
  },
  methods: {
    show () {
      this.$nextTick(() => {
        getOauth(this.biz).then(result=>{
          if(result.data){
            console.log(result.data.data.clientId)
            this.form.setFieldsValue({
              'id': result.data.id,
              'clientId': result.data.data.clientId,
              'secret': result.data.data.secret,
              'callback': result.data.data.callback
            })
          }
        })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          saveOauth(values).then(res => {
            if (res.ok) {
              this.$message.info('保存成功')
            }
          })
        }
      })
    },
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
