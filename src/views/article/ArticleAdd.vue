<template>
  <a-card>
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-row>
        <a-col span="12">
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
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" align="top">
        <a-col span="20">
          <div id="vditor"></div>
        </a-col>
      </a-row>
      <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      width="600"
      @close="onClose"
    >
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
      <a-form-item label="标签">
        <a-select mode="multiple" v-decorator="['tagList']">
          <a-select-option v-for="item in tagList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-radio-group v-decorator="['publishStatus',{initialValue: 2}]">
          <a-radio :value="1">未发布</a-radio>
          <a-radio :value="2">已发布</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-drawer>
    </a-form>
    <div class="flat-btn"><a-button type="primary" @click="moreSet">更多</a-button></div>
  </a-card>
</template>

<script>
import { Col, Divider, Form, Input, Modal, Row, Select, Card, Radio,Drawer } from 'ant-design-vue'
import { getTopicListType, saveArticle, getTagList, getArticle } from '@/api/content'
import { ImgUpload, } from '@/components'
import Vditor from 'vditor'
import "vditor/dist/index.css";

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
    ADrawer: Drawer
  },
  data () {
    return {
      form: this.$form.createForm(this),
      topicList: [],
      contentModel: '',
      tagList: [],
      visible: false
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
    },
    init(){
      new Vditor('vditor', {
        height: 500,
        placeholder: '此处为话题内容……',
        theme: 'classic',
        counter: {
          enable: true,
          type: 'markdown'
        },
        preview: {
          delay: 0,
          hljs: {
            style: 'monokai',
            lineNumber: true
          }
        },
        tab: '\t',
        typewriterMode: true,
        toolbarConfig: {
          pin: true
        },
        cache: {
          enable: false
        },
        mode: 'wysiwyg',
        toolbar: [
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          '|',
          'upload',
          // 'record',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'export',
          {
            name: 'more',
            toolbar: [
                'fullscreen',
                'both',
                'preview',
                'info',
                'help',
            ],
          },
          {
            hotkey: '⇧⌘S',
            name: 'sponsor',
            tipPosition: 's',
            tip: '成为赞助者',
            className: 'right',
            icon: '<svg t="1589994565028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2808" width="32" height="32"><path d="M506.6 423.6m-29.8 0a29.8 29.8 0 1 0 59.6 0 29.8 29.8 0 1 0-59.6 0Z" fill="#0F0F0F" p-id="2809"></path><path d="M717.8 114.5c-83.5 0-158.4 65.4-211.2 122-52.7-56.6-127.7-122-211.2-122-159.5 0-273.9 129.3-273.9 288.9C21.5 562.9 429.3 913 506.6 913s485.1-350.1 485.1-509.7c0.1-159.5-114.4-288.8-273.9-288.8z" fill="#FAFCFB" p-id="2810"></path><path d="M506.6 926c-22 0-61-20.1-116-59.6-51.5-37-109.9-86.4-164.6-139-65.4-63-217.5-220.6-217.5-324 0-81.4 28.6-157.1 80.6-213.1 53.2-57.2 126.4-88.8 206.3-88.8 40 0 81.8 14.1 124.2 41.9 28.1 18.4 56.6 42.8 86.9 74.2 30.3-31.5 58.9-55.8 86.9-74.2 42.5-27.8 84.3-41.9 124.2-41.9 79.9 0 153.2 31.5 206.3 88.8 52 56 80.6 131.7 80.6 213.1 0 103.4-152.1 261-217.5 324-54.6 52.6-113.1 102-164.6 139-54.8 39.5-93.8 59.6-115.8 59.6zM295.4 127.5c-72.6 0-139.1 28.6-187.3 80.4-47.5 51.2-73.7 120.6-73.7 195.4 0 64.8 78.3 178.9 209.6 305.3 53.8 51.8 111.2 100.3 161.7 136.6 56.1 40.4 88.9 54.8 100.9 54.8s44.7-14.4 100.9-54.8c50.5-36.3 108-84.9 161.7-136.6 131.2-126.4 209.6-240.5 209.6-305.3 0-74.9-26.2-144.2-73.7-195.4-48.2-51.9-114.7-80.4-187.3-80.4-61.8 0-127.8 38.5-201.7 117.9-2.5 2.6-5.9 4.1-9.5 4.1s-7.1-1.5-9.5-4.1C423.2 166 357.2 127.5 295.4 127.5z" fill="#141414" p-id="2811"></path><path d="M353.9 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2812"></path><path d="M659.3 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2813"></path><path d="M411.6 538.5c0 52.3 42.8 95 95 95 52.3 0 95-42.8 95-95v-31.7h-190v31.7z" fill="#5B5143" p-id="2814"></path><path d="M506.6 646.5c-59.6 0-108-48.5-108-108v-31.7c0-7.2 5.8-13 13-13h190.1c7.2 0 13 5.8 13 13v31.7c0 59.5-48.5 108-108.1 108z m-82-126.7v18.7c0 45.2 36.8 82 82 82s82-36.8 82-82v-18.7h-164z" fill="#141414" p-id="2815"></path><path d="M450.4 578.9a54.7 27.5 0 1 0 109.4 0 54.7 27.5 0 1 0-109.4 0Z" fill="#EA64F9" p-id="2816"></path><path d="M256 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2817"></path><path d="M703.3 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2818"></path></svg>',
            click () {alert('捐赠地址：https://ld246.com/sponsor')},
          },
        ]
    });
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
    this.init();
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
.flat-btn{
  position: absolute;
  right: 10px;
  top: 40%;
}
</style>
