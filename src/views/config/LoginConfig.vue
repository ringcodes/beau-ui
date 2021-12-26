<template>
  <div>
    <div class="mb-10">
      <a-alert
        description="回调地址统一配置成：域名+/auth/{source}; {source}取值：github, git_ee, ding_ding"
        type="warning"
      />
    </div>
    <a-row :gutter="16" class="mt-b20">
      <a-col :span="12">
        <a-card title="github登录配置">
          <a-form :form="forms.githubForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-form-item v-show="false">
              <a-input v-decorator="['configMd5']"/>
            </a-form-item>
            <a-form-item label="Client ID">
              <a-input v-decorator="['appKey',{rules: [{required: true, message:'请输入名称'}]}]"/>
            </a-form-item>
            <a-form-item label="Client secrets">
              <a-textarea :rows="2" v-decorator="['appSecret',{rules: [{required: true, message:'请输入名称'}]}]"/>
            </a-form-item>
            <a-form-item :wrapperCol="{offset:4}">
              <a-button type="primary" @click="handleSubmit('githubForm','GITHUB')">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="gitee登录配置">
          <a-form :form="forms.giteeForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-form-item v-show="false">
              <a-input v-decorator="['configMd5']"/>
            </a-form-item>
            <a-form-item label="Client ID">
              <a-input v-decorator="['appKey',{rules: [{required: true, message:'请输入名称'}]}]"/>
            </a-form-item>
            <a-form-item label="Client secrets">
              <a-textarea :rows="2" v-decorator="['appSecret',{rules: [{required: true, message:'请输入名称'}]}]"/>
            </a-form-item>
            <a-form-item :wrapperCol="{offset:4}">
              <a-button type="primary" @click="handleSubmit('giteeForm','GIT_EE')">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="钉钉登录配置">
          <a-form :form="forms.dingForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
            <a-form-item v-show="false">
              <a-input v-decorator="['configMd5']"/>
            </a-form-item>
            <a-form-item label="AppKey">
              <a-input v-decorator="['appKey',{rules: [{required: true, message:'请输入AppKey'}]}]"/>
            </a-form-item>
            <a-form-item label="AppSecret">
              <a-textarea :rows="2" v-decorator="['appSecret',{rules: [{required: true, message:'请输入AppSecret'}]}]"/>
            </a-form-item>
            <a-form-item :wrapperCol="{offset:4}">
              <a-button type="primary" @click="handleSubmit('dingForm','DING_DING')">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { saveConfig, queryConfig } from '@/api/manage'

export default {
  data () {
    return {
      forms: {
        githubForm: this.$form.createForm(this),
        giteeForm: this.$form.createForm(this),
        dingForm: this.$form.createForm(this)
      }
    }
  },
  methods: {
    handleSubmit (form, key) {
      this.forms[form].validateFields((errors, values) => {
        if (!errors) {
          console.log(values)
          saveConfig({
            configName: '登录配置',
            configType: 'LOGIN',
            configKey: key,
            configContent: JSON.stringify(values),
            configMd5: values.configMd5
          }).then(() => {
            this.$message.info('保存成功')
          })
        }
      })
    }
  },
  mounted () {
    queryConfig({
      configTypeEnum: 'LOGIN',
      queryContent: true
    }).then(res => {
      console.log(res)
      this.$nextTick(() => {
        res.data.map(it => {
          const data = { configMd5: it.configMd5, ...JSON.parse(it.configContent) }
          if (it.configKey === 'GIT_EE') {
            this.forms.giteeForm.setFieldsValue(data)
          }
          if (it.configKey === 'DING_DING') {
            this.forms.dingForm.setFieldsValue(data)
          }
          if (it.configKey === 'GITHUB') {
            this.forms.githubForm.setFieldsValue(data)
          }
        })
      })
    })
  }
}
</script>
<style lang="less" scoped>
.mt-b20{
  margin-bottom: 10px;
}
</style>
