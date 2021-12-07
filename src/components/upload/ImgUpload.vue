<template>
  <div>
    <a-upload
      name="file"
      :action="action"
      :headers="headers"
      :data="{code:code,source:source}"
      list-type="picture-card"
      :file-list="fileListData"
      @change="handleChange"
      @preview="handlePreview"
    >
      <div v-if="fileListData.length < fileMax">
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
      type: String,
      default: ''
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
        'Authorization': token
      },
      previewVisible: false,
      previewImage: '',
      action: process.env.VUE_APP_BASE_API + '/file/upload',
      fileListData: []
    }
  },
  methods: {
    setImg (filelist) {
      this.fileListData = filelist
    },
    handleCancel () {
      this.previewVisible = false
    },
    handleChange ({ fileList }) {
      this.fileListData = fileList
      this.$emit('change', fileList)
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    }
  },
  mounted () {
    console.log(this.fileList)
  }
}
</script>
