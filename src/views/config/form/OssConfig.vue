<template>
  <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 14 }">
    <a-form-item v-show="false">
      <a-input v-decorator="['id']"/>
    </a-form-item>
    <a-form-item label="服务商">
      <a-radio-group v-decorator="['biz', {initialValue:'OSS_QINIU'}]">
        <a-radio value="OSS_QINIU">七牛OSS</a-radio>
        <a-radio value="OSS_TENCENT">腾讯云OSS</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="bucket">
      <a-input v-decorator="['bucket',{rules: [{required: true,message:'请输入名称'}]}]"/>
    </a-form-item>
    <a-form-item label="accessKey">
      <a-input v-decorator="['accessKey',{rules: [{required: true,message:'请输入内容'}]}]"/>
    </a-form-item>
    <a-form-item label="secretKey">
      <a-input v-decorator="['secretKey',{rules: [{required: true,message:'请输入内容'}]}]"/>
    </a-form-item>
    <a-form-item label="region">
      <a-input v-decorator="['regionName',{rules: [{required: true,message:'请输入内容'}]}]"/>
    </a-form-item>
    <a-form-item :wrapperCol="{offset:3}">
      <a-button type="primary" @click="handleSubmit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { Form, Input, Spin, Select, Icon, Radio } from 'ant-design-vue'
import { saveConfig, getConfigType } from '@/api/manage'

export default {
  name: 'OssConfig',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  components: {
    ASpin: Spin,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea,
    AIcon: Icon,
    ARadio: Radio,
    ARadioGroup: Radio.Group
  },
  methods: {
    show () {
      this.$nextTick(() => {
        getConfigType('OSS_TENCENT').then(res => {
          if (res.ok) {
            const data = JSON.parse(res.data.content)
            if (data) {
              this.form.setFieldsValue({
                'id': res.data.id,
                'name': res.data.name,
                'biz': res.data.biz,
                'bucket': data.bucket,
                'accessKey': data.accessKey,
                'secretKey': data.secretKey,
                'regionName': data.regionName
              })
            }
          }
        })
      })
    },
    add () {
      this.linkList.push({})
    },
    remove (i) {
      this.linkList.splice(i, 1)
    },
    handleSubmit () {
      var values = {
        id: this.form.getFieldValue('id'),
        biz: this.form.getFieldValue('biz'),
        name: '存储配置',
        content: JSON.stringify({
          bucket: this.form.getFieldValue('bucket'),
          accessKey: this.form.getFieldValue('accessKey'),
          secretKey: this.form.getFieldValue('secretKey'),
          regionName: this.form.getFieldValue('regionName')
        })
      }
      saveConfig(values).then(res => {
        if (res.ok) {
          this.$message.info('保存成功')
        }
      })
    }
  },
  mounted () {
    this.show()
  }
}
</script>

<style scoped>
 .link-item{
   margin-bottom: 15px;
 }
 .dynamic-delete-button{
   padding-left: 10px;
   font-size: 24px;
   color: red;
 }
</style>
