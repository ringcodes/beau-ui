<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="4" :sm="24">
          <a-form-item label="名称">
            <a-input placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <a-form-item label="类型">
            <a-select placeholder="请选择" default-value="">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">文章</a-select-option>
              <a-select-option value="2">软件</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="showLoadingMore()">查询</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd()">添加</a-button>
    </div>
    <a-row style="padding: 14px 0px;background: #fafafa;border-bottom: 1px solid #ebedf0">
      <a-col :span="4">图标</a-col>
      <a-col :span="4">名称</a-col>
      <a-col :span="4">类型</a-col>
      <a-col :span="4">位置</a-col>
      <a-col :span="4">更新时间</a-col>
      <a-col :span="4">操作</a-col>
    </a-row>
    <div v-for="item in data.list" :key="item.id">
      <a-row :gutter="4" style="padding:8px 0px;border-bottom: 1px solid #ebedf0;vertical-align: bottom">
        <a-col :span="4">
          <a-avatar
            size="large"
            :src="item.topicPic"
          />
        </a-col>
        <a-col :span="4">{{ item.topicName }}</a-col>
        <a-col :span="4">{{ item.topicTypeName }}</a-col>
        <a-col :span="4">{{ item.positionName }}</a-col>
        <a-col :span="4">{{ item.updateTime }}</a-col>
        <a-col :span="4">
          <a @click="editTopic(item)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确认要删除吗？" @confirm="() => handleDel(item)">
            <a>删除</a>
          </a-popconfirm>
        </a-col>
      </a-row>
    </div>
    <div style="text-align: center;padding-top: 8px">
      <a-pagination v-model="data.pageNumber" :total="data.totalRow" showLessItems @change="onChange"/>
    </div>
    <a-modal
      title="操作"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :form="form" >
        <a-form-item v-show="false">
          <a-input v-decorator="['id']"/>
        </a-form-item>
        <a-form-item v-show="false">
          <a-input v-decorator="['topicPic']"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="名称">
          <a-input
            v-decorator="['topicName', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类型">
          <a-select
            v-decorator="['topicType', { initialValue:'1', rules: [{ required: true, message: '请选择类型' }] }]" >
            <a-select-option value="1">文章</a-select-option>
            <a-select-option value="2">软件</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图片">
          <img :src="imageUrl" />
          <s-upload @change="handleChange" :code="uploadData.code" :source="2"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { STable, ImgUpload } from '@/components'
import { getTopicList, saveTopic, delTopic } from '@/api/content'
import { Row, Col, Form, Modal, Select, Input, Pagination, Avatar, Popconfirm, Divider } from 'ant-design-vue'
import { getId, listPosition } from '@/api/manage'
export default {
  name: 'TableList',
  components: {
    ARow: Row,
    ACol: Col,
    STable,
    AForm: Form,
    AFormItem: Form.Item,
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    APagination: Pagination,
    AAvatar: Avatar,
    APopconfirm: Popconfirm,
    ADivider: Divider,
    SUpload: ImgUpload
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      loading: false,
      loadingMore: false,
      mdl: {},
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      data: [],
      imageUrl: '',
      uploadData: {
        source: 1,
        code: ''
      },
      positionList: []
    }
  },
  mounted () {
    this.showLoadingMore()
  },
  methods: {
    handleAdd () {
      this.visible = true
      getId().then(res => {
        if (res.ok) {
          this.uploadData.code = res.data
          this.form.setFieldsValue({
            'id': res.data
          })
        } else {
          this.$message.error('系统错误')
        }
      })
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    editTopic (record) {
      this.visible = true
      this.$nextTick(() => {
        this.uploadData.code = record
        this.form.setFieldsValue({
          'id': record.id,
          'topicName': record.topicName,
          'topicType': record.topicType + '',
          'topicPosition': record.position + ''
        })
      })
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          saveTopic(values).then(res => {
            if (res.ok) {
              this.$message.info('保存成功')
              this.visible = false
              this.showLoadingMore()
            }
          })
        }
      })
    },
    showLoadingMore () {
      getTopicList(this.queryParam).then(res => {
        this.data = res.data
      })
    },
    handleDel (item) {
      delTopic(item.id).then(res => {
        this.$message.info('删除成功')
        this.showLoadingMore()
      })
    },
    onChange (page) {
      this.queryParam.pageNumber = page
      this.showLoadingMore()
    },
    handleChange (info) {
      const file = info[0]
      if (file.status !== 'done') {
        return
      }
      const data = file.response
      if (data.ok) {
        this.form.setFieldsValue({
          'topicPic': data.data.fileName
        })
        this.imageUrl = data.data.fileName
      }
    }
  }
}
</script>
