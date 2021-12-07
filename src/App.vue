<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import { AppDeviceEnquire } from '@/utils/mixin'

const { locales } = window.antd // <!-- 2 --> 这里最重要

export default {
  mixins: [AppDeviceEnquire],
  components: {
  },
  data () {
    return {
      locale: locales.zh_CN
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
