<template>
  <a-card title="详情">
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <a-row>
        <a-col span="18">
          <a-form-item v-show="false">
            <a-input v-decorator="['id']"/>
          </a-form-item>
          <a-form-item label="标题">
            <a-input v-decorator="['title']"/>
          </a-form-item>
          <a-form-item label="图片">
            <img :src="record.titlePic"/>
          </a-form-item>
          <a-form-item label="源地址">
            {{ record.sourceUrl }}
          </a-form-item>
          <a-form-item label="描述">
            {{ record.description }}
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item label="主题">
            <a-select v-decorator="['topicId',{rules: [{required: true,message:'请选择主题'}]}]">
              <a-select-option v-for="(item) in topicList" :value="item.id" :key="item.id">{{ item.topicName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="标签">
            <a-select mode="multiple" v-decorator="['tagList']">
              <a-select-option v-for="item in tagList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="save">保存</a-button>
            <a-button type="danger" @click="handleDel">删除</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" align="top">
        <a-col span="20">
          <div v-html="record.content"></div>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import { Col, Divider, Form, Input, Modal, Row, Select, Card, Radio } from 'ant-design-vue'
import { getTopicListType, saveArticle, getTagList, getArticle, delArticle } from '@/api/content'
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
    ARadioGroup: Radio.Group
  },
  data () {
    return {
      form: this.$form.createForm(this),
      record: {},
      topicList: [],
      tagList: []
    }
  },
  methods: {
    onEditorChange () {
    },
    save () {
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
    handleDel () {
      delArticle(this.$route.query.id).then(res => {
        if (res.ok) {
          this.$message.info('删除成功')
          this.$router.push({ name: 'ArticleList' })
        } else {
          this.$message.error('删除失败')
        }
      })
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
      if (res.ok) {
        this.tagList = res.data.list
      }
    })
    getArticle(id).then(result => {
      const res = result.data
      this.record = res
      this.$nextTick(
        this.form.setFieldsValue({
          'id': result.data.id,
          'topicId': res.topicId,
          'tagList': res.tagList,
          'title': res.title
        })
      )
    })
  }
}
</script>

<style scoped>
 .editor {
  line-height: normal !important;
  height: 500px;
  text-align: center;
  display: inline-block;
 }
</style>
