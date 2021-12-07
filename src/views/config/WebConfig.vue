<template>
  <div class="">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="基本配置">
          <BaseConfig />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="友情链接">
          <a slot="extra" href="#" @click="addLink">新增</a>
          <LinkConfig ref="linkConfigRef"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import BaseConfig from './form/BaseConfig'
import LinkConfig from './form/LinkConfig'

export default {
  name: 'WebConfig',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      title: '角色编辑',
      formLayout: 'horizontal'
    }
  },
  components: {
    BaseConfig,
    LinkConfig
  },
  methods: {
    addLink () {
      this.$refs.linkConfigRef.add()
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
