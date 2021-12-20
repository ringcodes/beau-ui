<template>
  <a-card>
    <a-row type="flex" justify="center" align="top">
      <a-col :span="16">
        <tinymce :height="600" v-model="contentModel" ref="tinymce"></tinymce>
      </a-col>
      <a-col :span="8">
        <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <a-form-item label="标题">
            <a-input v-decorator="['title',{rules: [{required: true,message:'请输入标题'}]}]"/>
          </a-form-item>
          <a-form-item label="主题">
            <a-select v-decorator="['topicId',{rules: [{required: true,message:'请选择主题'}]}]">
              <a-select-option v-for="(item) in topicList" :value="item.id" :key="item.id">{{ item.topicName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="图片">
            <ImgUpload ref="imgUpload" @change="handleChange" :source="2"/>
          </a-form-item>
          <a-form-item label="描述">
            <a-textarea v-model="dataFrom.description" rows="4"/>
          </a-form-item>
          <a-form-item label="源地址">
            <a-input v-model="dataFrom.sourceUrl"/>
          </a-form-item>
          <a-form-item label="标签">
            <a-checkbox-group v-model="dataFrom.tagList" class="mt-checkbox-g">
              <template v-for="(item,index) in tagList">
                <a-checkbox :value="item.id" :key="index" class="mt-checkbox">
                  {{ item.name }}
                </a-checkbox>
              </template>
            </a-checkbox-group>
            <a-button type="link" @click="()=>{this.dataFrom.tagList=[]}">清除</a-button>
          </a-form-item>
          <a-form-item label="状态">
            <a-radio-group v-model="dataFrom.publishStatus">
              <a-radio value="PUBLISH">草稿</a-radio>
              <a-radio value="PUBLISHED">已发布</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="SEO关键字">
            <a-textarea v-model="dataFrom.seoKeys" rows="2"/>
          </a-form-item>
          <a-form-item label="SEO描述">
            <a-textarea v-model="dataFrom.seoDesc" rows="2"/>
          </a-form-item>
          <a-button type="primary" @click="save">保存</a-button>
        </a-form>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { getTopicListType, saveArticle, getTagList, getArticle } from '@/api/content'
import { ImgUpload } from '@/components'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'ArticleEdit',
  components: {
    ImgUpload,
    Tinymce
  },
  data () {
    return {
      form: this.$form.createForm(this),
      topicList: [],
      contentModel: '',
      tagList: [],
      visible: false,
      editor: null,
      dataFrom: {
        publishStatus: 'PUBLISHED'
      },
      editorConfig: {
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
      }
    }
  },
  methods: {
    onClose () {
      this.visible = false
    },
    moreSet () {
      this.visible = true
    },
    onEditorChange (html) {
      this.contentModel = html
    },
    save () {
      this.dataFrom.content = this.contentModel
      this.dataFrom.articleType = 1
      this.form.validateFields((err, values) => {
        if (!err) {
          saveArticle({
            ...values,
            ...this.dataFrom
          }).then(res => {
            if (res.ok) {
              this.$message.info('保存成功')
              this.visible = false
              this.$router.push({ name: 'ArticleList' })
            }
          })
        }
      })
    },
    handleChange (info) {
      const file = info[0]
      if (!file || file.status !== 'done') {
        return
      }
      const data = file.response
      if (data.ok) {
        this.dataFrom.titlePic = data.data.fileName
      }
    }
  },
  mounted () {
    getTopicListType('ARTICLE').then(res => {
      if (res.ok) {
        this.topicList = res.data
      }
    })
    getTagList({}).then(res => {
      this.tagList = res.data
    })
  },
  activated () {
    const id = this.$route.query.id
    if (id > 0) {
      getArticle(id).then(result => {
        const res = result.data
        this.$nextTick(() => {
          this.contentModel = res.content
          this.$refs.tinymce.setContent(res.content)
          console.log(this.contentModel)
          this.form.setFieldsValue({
            'title': res.title,
            'topicId': res.topicId
          })
        })
        this.dataFrom = {
          content: res.content,
          id: res.id,
          titlePic: res.titlePic,
          sourceUrl: res.sourceUrl,
          description: res.description,
          tag: res.tag,
          publishStatus: res.publishStatus
        }
      })
    }
  }
}
</script>

<style scoped>
 .mt-editor {
  line-height: normal !important;
  height: 500px;
  text-align: center;
  display: inline-block;
 }
</style>
<style lang="less">
 .ck-editor__editable { min-height: 500px; }
 .mt-checkbox{
   min-width: 120px;
 }
 .mt-checkbox-g{
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
 }
 .ant-checkbox-wrapper + .ant-checkbox-wrapper{
   margin: 0;
 }
 .ant-form-item{
   margin-bottom: 10px;
 }
</style>
