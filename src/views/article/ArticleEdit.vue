<template>
  <a-card>
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-row type="flex" justify="start" align="top" :gutter="16">
        <a-col span="10">
          <a-form-item
            label="标题">
            <a-input v-decorator="['title',{rules: [{required: true,message:'请输入标题'}]}]"/>
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item
            label="主题">
            <a-select v-decorator="['topicId',{rules: [{required: true,message:'请选择主题'}]}]">
              <a-select-option v-for="(item) in topicList" :value="item.id" :key="item.id">{{ item.topicName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="4">
          <a-form-item>
            <a-button type="primary" @click="save">保存</a-button>
            <a-button type="info" @click="moreSet" style="margin-left: 8px;">更多</a-button>
          </a-form-item>
        </a-col>
      </a-row>
          </a-form>
      <a-row type="flex" justify="center" align="top">
        <a-col span="24">
          <tinymce :height="600" v-model="contentModel"></tinymce>
        </a-col>
      </a-row>
      <a-drawer
      title="更多设置"
      placement="right"
      :closable="false"
      :visible="visible"
      width="600"
      @close="onClose"
    >
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-form-item
        label="图片">
        <ImgUpload ref="imgUpload" @change="handleChange" :source="2"/>
      </a-form-item>
      <a-form-item
        label="描述">
        <a-textarea v-model="dataFrom.description" rows="4"/>
      </a-form-item>
      <a-form-item
        label="源地址">
        <a-input v-model="dataFrom.sourceUrl"/>
      </a-form-item>
      <a-form-item label="标签">
        <a-select mode="multiple" v-model="dataFrom.tagList">
          <a-select-option v-for="item in tagList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-radio-group v-model="dataFrom.publishStatus">
          <a-radio :value="1">未发布</a-radio>
          <a-radio :value="2">已发布</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    </a-drawer>
  </a-card>
</template>

<script>
import { Col, Divider, Form, Input, Modal, Row, Select, Card, Radio,Drawer } from 'ant-design-vue'
import { getTopicListType, saveArticle, getTagList, getArticle } from '@/api/content'
import { ImgUpload } from '@/components'
 import Tinymce from '@/components/Tinymce'

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
    ImgUpload,
    ADrawer: Drawer,
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
      dataFrom:{
        publishStatus: 2
      },
      editorConfig: {
        height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }
      }
  },
  methods: {
    onClose(){
      this.visible = false;
    },
    moreSet(){
      this.visible = true;
    },
    onEditorChange (html) {
      this.contentModel = html;
    },
    save () {
      this.dataFrom.content = this.contentModel;
      this.dataFrom.articleType = 1;
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
        this.dataFrom.titlePic = data.data.fileName;
      }
    },
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
    if(id > 0){
      getArticle(id).then(result => {
        const res = result.data
        this.contentModel = res.content
        this.$nextTick(()=>{
          this.form.setFieldsValue({
            'title': res.title,
            'topicId': res.topicId,
          })
        });
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
</style>