<template>
  <tooltip v-if="tips !== ''">
    <template slot="title">{{ tips }}</template>
    <avatar :size="avatarSize" :src="src" />
  </tooltip>
  <avatar v-else :size="avatarSize" :src="src" />
</template>

<script>

export default {
  name: 'AvatarItem',
  components: {
  },
  props: {
    tips: {
      type: String,
      default: '',
      required: false
    },
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      size: this.$parent.size
    }
  },
  computed: {
    avatarSize () {
      return this.size !== 'mini' && this.size || 20
    }
  },
  watch: {
    '$parent.size' (val) {
      this.size = val
    }
  }
}
</script>
