<template>
  <a-card :title="'标题：'+ record.title">
    <a slot="extra" @click="returnPage" >返回</a>
    <div class="fix-footer">
      <a-button @click="setArticle" type="primary">设置</a-button>
      <a-divider type="vertical" />
      <a-popconfirm placement="topLeft" ok-text="确定" cancel-text="取消" @confirm="handleDel">
        <template slot="title">
          <p>确定要删除吗？</p>
        </template>
        <a-button type="danger">删除</a-button>
      </a-popconfirm>
      <a-divider type="vertical" />
      <a-button @click="returnPage">返回</a-button>
    </div>
    <a-row type="flex" justify="center" align="top">
      <a-col span="20">
        <div v-html="record.content"></div>
      </a-col>
    </a-row>
    <a-modal
      :width="850"
      :visible="visible"
      @ok="save"
      @cancel="handleCancel"
      okText="保存"
      cancelText="取消"
      force-render>
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
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
      </a-form>
    </a-modal>
    <a-back-top />
  </a-card>
</template>

<script>
import { Col, Divider, Form, Input, Modal, Row, Select, Card, Radio, Popconfirm, BackTop } from 'ant-design-vue'
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
    ARadioGroup: Radio.Group,
    APopconfirm: Popconfirm,
    ABackTop: BackTop
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
      this.visible = true
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
    }
  },
  mounted () {
    const id = this.$route.query.id
    getArticle(id).then(result => {
      const res = result.data
      this.record = res
    })
  }
}
</script>

<style scoped>
 .fix-footer {
    position: fixed;
    bottom: 0;
    right: 35%;
    z-index: 99;
    border-radius: 5px;
    background:rgba(148, 148, 145, 0.6);
    padding: 18px 100px;
 }
</style>
