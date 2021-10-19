<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import { AppDeviceEnquire } from '@/utils/mixin'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'ant-design-vue'

export default {
  mixins: [AppDeviceEnquire],
  components: {
    AConfigProvider: ConfigProvider
  },
  data () {
    return {
      locale: zhCN,
    }
  },
  mounted () {

  }
}
</script>
<style>
  #app {
    height: 100%;
  }
</style>
