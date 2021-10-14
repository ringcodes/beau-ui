<template>
  <a-card>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <a-row>
        <a-col span="18">
          <a-form-item v-show="false">
            <a-input v-decorator="['id']"/>
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['content']"/>
          </a-form-item>
          <a-form-item
            label="标题">
            <a-input v-decorator="['title',{rules: [{required: true,message:'请输入标题'}]}]"/>
          </a-form-item>
          <a-form-item
            label="图片">
            <a-input v-decorator="['titlePic']" v-show="false"/>
            <ImgUpload ref="imgUpload" @change="handleChange" :source="2"/>
          </a-form-item>
          <a-form-item
            label="源地址">
            <a-input v-decorator="['sourceUrl']"/>
          </a-form-item>
          <a-form-item
            label="描述">
            <a-textarea v-decorator="['description']" rows="4"/>
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item
            label="主题">
            <a-select v-decorator="['topicId',{rules: [{required: true,message:'请选择主题'}]}]">
              <a-select-option v-for="(item) in topicList" :value="item.id" :key="item.id">{{ item.topicName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="标签">
            <a-select mode="multiple" v-decorator="['tagList']">
              <a-select-option v-for="item in tagList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="状态">
            <a-radio-group v-decorator="['publishStatus',{rules: [{required: true,message:'请选择主题'}]}]">
              <a-radio :value="1">未发布</a-radio>
              <a-radio :value="2">已发布</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="save">保存</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" align="top">
        <a-col span="20">
          <QuillEditor ref="myQuillEditor" class="mt-editor" @change="onEditorChange">
          </QuillEditor>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import { Col, Divider, Form, Input, Modal, Row, Select, Card, Radio } from 'ant-design-vue'
import { getTopicListType, saveArticle, getTagList, getArticle } from '@/api/content'
import { ImgUpload,QuillEditor } from '@/components'
export default {
  name: 'ArticleEdit',
  components: {
    ARow: Row,
    ACol: Col,
    AForm: Form,
    ACard: Card,
    AFormItem: Form.Item,
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    ADivider: Divider,
    ATextarea: Input.TextArea,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    QuillEditor,
    ImgUpload
  },
  data () {
    return {
      form: this.$form.createForm(this),
      topicList: [],
      contentModel: '',
      tagList: []
    }
  },
  methods: {
    onEditorChange (html) {
      this.contentModel = html;
    },
    save () {
      this.form.setFieldsValue({
        'content': this.contentModel
      })
      this.form.validateFields((err, values) => {
        if (!err) {
          saveArticle(values).then(res => {
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
        this.form.setFieldsValue({
          'topicPic': data.data.fileName
        })
      }
    }
  },
  mounted () {
    const id = this.$route.query.id
    getTopicListType(1).then(res => {
      if (res.ok) {
        this.topicList = res.data
      }
    })
    getTagList({}).then(res => {
        this.tagList = res.data
    })
    getArticle(id).then(result => {
      const res = result.data
      this.contentModel = res.content
      this.form.setFieldsValue({
        'content': res.content,
        'id': res.id,
        'title': res.title,
        'titlePic': res.titlePic,
        'sourceUrl': res.sourceUrl,
        'description': res.description,
        'topicId': res.topicId,
        'tag': res.tag,
        'publishStatus': res.publishStatus
      })
    })
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
.jsmind-container {
  background: #eee;
  padding: 5px;
  border: 1px solid #eeef;
}
</style>
