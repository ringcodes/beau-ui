<template>
  <a-card>
    <a-tabs default-active-key="Base">
      <a-tab-pane key="Base" tab="基本配置">
        <BaseConfig />
      </a-tab-pane>
      <a-tab-pane key="link" tab="友情链接" force-render>
        <LinkConfig />
      </a-tab-pane>
      <a-tab-pane key="oss" tab="文件储存配置" force-render>
        <OssConfig />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import { Tabs, Card } from 'ant-design-vue'
import { saveConfig, getById, getConfigType } from '@/api/manage'
import BaseConfig from './form/BaseConfig'
import LinkConfig from './form/LinkConfig'
import OssConfig from './form/OssConfig'

export default {
  name: 'WebConfig',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      title: '角色编辑',
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    ACard: Card,
    BaseConfig,
    LinkConfig,
    OssConfig
  },
  methods: {
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          saveConfig(values).then(res => {
            if (res.ok) {
              this.$message.info('保存成功')
            }
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
