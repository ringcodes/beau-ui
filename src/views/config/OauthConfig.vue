<template>
  <div class="table-wrapper">
    <a-tabs default-active-key="OAUTH_GITHUB" @tabClick="callback">
      <a-tab-pane key="OAUTH_GITHUB" tab="github" force-render>
        <OauthConfigForm ref="OAUTH_GITHUB" biz="OAUTH_GITHUB"/>
      </a-tab-pane>
      <a-tab-pane key="OAUTH_GITEE" tab="gitee" force-render>
        <OauthConfigForm ref="OAUTH_GITEE" biz="OAUTH_GITEE"/>
      </a-tab-pane>
      <a-tab-pane key="OAUTH_DING" tab="钉钉" force-render>
        <OauthConfigForm ref="OAUTH_DING" biz="OAUTH_DING"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs, Card } from 'ant-design-vue'
import OauthConfigForm from './OauthConfigForm'

export default {
  name: 'OauthConfig',
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    ACard: Card,
    OauthConfigForm
  },
  data () {
    return {

    }
  },
  methods: {
    callback (key) {
      this.$refs[key].show()
    }
  },
  mounted () {
    this.$refs['OAUTH_GITHUB'].show()
  }
}
</script>
