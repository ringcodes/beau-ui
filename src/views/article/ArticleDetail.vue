<template>
  <a-card :title="'标题：'+ record.title">
    <a-row type="flex" justify="center" align="top">
      <a-col span="20">
        <div v-html="record.contentMdView"></div>
      </a-col>
    </a-row>
    <a-drawer
      title="文章设置"
      :width="650"
      :visible="visible"
      @ok="save"
      @close="handleCancel"
    >
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']"/>
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-decorator="['title']"/>
        </a-form-item>
        <a-form-item label="图片">
          <ImgUpload ref="imgUpload" @change="handleChange" :source="2"/>
        </a-form-item>
        <a-form-item label="源地址">
          <a-input v-decorator="['sourceUrl']"/>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-decorator="['description']"/>
        </a-form-item>
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
        <a-form-item :wrapper-col="{ offset: 3 }">
          <a-button type="primary" >保存</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <div class="tool-btn">
      <a-button @click="handleEdit" type="primary">编辑</a-button>
      <a-button @click="setArticle" type="warging">设置</a-button>
      <a-button @click="handleDel" type="danger">删除</a-button>
      <a-button @click="returnPage" >返回</a-button>
    </div>
    <a-back-top />
  </a-card>
</template>

<script>
import { Col, Divider, Form, Input, Drawer, Row, Select, Card, Radio, Popconfirm, BackTop } from 'ant-design-vue'
import { getTopicListType, saveArticle, getTagList, getArticle, delArticle } from '@/api/content'
import { ImgUpload } from '@/components'

export default {
  name: 'ArticleEdit',
  components: {
    ARow: Row,
    ACol: Col,
    AForm: Form,
    ACard: Card,
    AFormItem: Form.Item,
    ADrawer: Drawer,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    ADivider: Divider,
    ATextarea: Input.TextArea,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    APopconfirm: Popconfirm,
    ABackTop: BackTop,
    ImgUpload
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      record: {},
      topicList: [],
      tagList: [],
      visible: false
    }
  },
  methods: {
    setArticle () {
      this.visible = true
      getTopicListType(1).then(res => {
        if (res.ok) {
          this.topicList = res.data
        }
      })
      getTagList({}).then(res => {
        this.tagList = res.data
      })
      this.$nextTick(() => {
        this.form.setFieldsValue({
          'id': this.record.id,
          'topicId': this.record.topicId,
          'tagList': this.record.tagList,
          'title': this.record.title,
          'sourceUrl': this.record.sourceUrl,
          'description': this.record.description
        })
      })
    },
    handleEdit () {
      if (this.record.articleType === 2) {
        // markdown
        this.$router.push({ path: '/article/add?id=' + this.record.id })
      } else {
        // html
        this.$router.push({ path: '/article/edit?id=' + this.record.id })
      }
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
    },
    handleCancel () {
      this.visible = false
    },
    returnPage () {
      this.$router.push({ name: 'ArticleList' })
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
  activated () {
    const id = this.$route.query.id
    getArticle(id).then(result => {
      const res = result.data
      this.record = res
    })
  }
}
</script>

<style lang="less" scoped>
 .tool-btn {
    position: fixed;
    bottom: 45%;
    right: 25px;
    z-index: 99;
    border-radius: 5px;
    background:rgba(207, 207, 203, 0.6);
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    button {
      margin: 3px 0px;
    }
 }
</style>
