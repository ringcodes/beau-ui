<template>
  <a-modal
    :title="title"
    :width="850"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    okText="保存"
    cancelText="取消"
  >
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <a-form-item v-show="false">
        <a-input v-decorator="['id']"/>
      </a-form-item>
      <a-form-item label="名称">
        <a-input v-decorator="['name',{rules: [{required: true,message:'请输入名称'}]}]"/>
      </a-form-item>
      <a-form-item label="业务类型">
        <a-select v-decorator="['biz',{rules: [{required: true,message:'请输入业务类型'}]}]">
          <a-select-option v-for="item in configType" :value="item.name" :key="item.name">{{ item.desc }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="内容">
        <a-textarea v-decorator="['content',{rules: [{required: true,message:'请输入内容'}]}]" rows="8"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { Form, Input, Modal, Spin, Select } from 'ant-design-vue'
import { saveConfig, getById, getConfigType } from '@/api/manage'

export default {
  name: 'ConfigEdit',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      title: '角色编辑',
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      configType: []
    }
  },
  components: {
    AModal: Modal,
    ASpin: Spin,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea
  },
  methods: {
    add () {
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    edit (record) {
      this.visible = true
      if (record) {
        this.$nextTick(() => {
          getById(record.id).then(res => {
            if (res.ok) {
              this.config = res.data
              this.form.setFieldsValue({
                'id': this.config.id,
                'name': this.config.name,
                'biz': this.config.biz,
                'content': this.config.content
              })
            }
          })
        })
      } else {
        this.$nextTick(() => {
          this.form.resetFields()
          this.init()
        })
      }
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          saveConfig(values).then(res => {
            if (res.ok) {
              this.$message.info('保存成功')
              this.close()
              this.$emit('ok', values)
            }
          })
        }
      })
    },
    handleCancel () {
      this.close()
    },
    close () {
      this.visible = false
    }
  },
  mounted () {
    getConfigType().then(res => {
      if (res.ok) {
        this.configType = res.data
      }
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
