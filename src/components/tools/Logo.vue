<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  components: {

  },
  props: {
    title: {
      type: String,
      default: '后台管理',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
