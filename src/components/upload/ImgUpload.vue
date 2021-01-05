<template>
  <div>
    <a-upload
     name="file"
     :multiple="false"
     action="/api/upload/file"
     :headers="headers"
     :data="{code:code,source:source}"
     @change="handleChange"
     list-type="picture-card"
     @preview="handlePreview"
    >
      <div v-if="fileList.length < fileMax">
        <a-icon type="plus"/>
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Upload, Icon, Modal } from 'ant-design-vue'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
const token = Vue.ls.get(ACCESS_TOKEN)
export default {
  name: 'ImgUpload',
  components: {
    AUpload: Upload,
    AIcon: Icon,
    AModal: Modal
  },
  props: {
    code: {
      type: [String, Number],
      required: true
    },
    source: {
      type: [String, Number],
      required: true
    },
    fileMax: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      headers: {
        'Sid': token
      },
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
      this.$emit('change', fileList)
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    }
  }
}
</script>

<style scoped>
</style>
