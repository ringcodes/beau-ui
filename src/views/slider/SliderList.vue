<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          <a-form-item label="位置">
            <a-select placeholder="请选择" v-model="queryParam.position">
              <a-select-option value="">全部</a-select-option>
              <a-select-option v-for="item in positionList" :value="item.value" :key="item.value">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="showLoadingMore()">查询</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd()">添加</a-button>
    </div>
    <a-row style="padding-bottom: 4px;border-bottom: 1px solid #ebedf0">
      <a-col :span="4">图标</a-col>
      <a-col :span="4">名称</a-col>
      <a-col :span="4">位置</a-col>
      <a-col :span="4">更新时间</a-col>
      <a-col :span="4">操作</a-col>
    </a-row>
    <div v-for="item in data.list" :key="item.id">
      <a-row :gutter="4" style="padding:8px 0px;border-bottom: 1px solid #ebedf0;vertical-align: bottom">
        <a-col :span="4">
          <img :src="item.pic" width="200" height="120"/>
        </a-col>
        <a-col :span="4">{{ item.name }}</a-col>
        <a-col :span="4">{{ item.positionName }}</a-col>
        <a-col :span="4">{{ item.updateTime }}</a-col>
        <a-col :span="4">
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
      title="新增"
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
          <a-input v-decorator="['pic']"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="位置">
          <a-select
            v-decorator="['position', { initialValue:1, rules: [{ required: true, message: '请选择类型' }] }]" >
            <a-select-option v-for="item in positionList" :value="item.value" :key="item.value">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="图片">
          <s-upload @change="handleChange" :code="uploadData.code" :source="4"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { STable, ImgUpload } from '@/components'
import { getSliderList, delSlider, saveSlider, listSliderPosition } from '@/api/content'
import { Row, Col, Form, Modal, Select, Input, Pagination, Avatar, Popconfirm, Divider } from 'ant-design-vue'
import { getId } from '@/api/manage'

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
    listSliderPosition().then(res => {
      if (res.ok) {
        this.positionList = res.data
      }
    })
  },
  methods: {
    handleAdd () {
      this.visible = true
      getId().then(res => {
        if (res.ok) {
          this.uploadData.code = res.data
          this.$nextTick(() => {
            this.form.setFieldsValue({
              'id': res.data
            })
          })
        } else {
          this.$message.error('系统错误')
        }
      })
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          saveSlider(values).then(res => {
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
      getSliderList(this.queryParam).then(res => {
        this.data = res.data
      })
    },
    handleDel (item) {
      delSlider(item.id).then(res => {
        if (res.ok) {
          this.$message.info('删除成功')
          this.showLoadingMore()
        }
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
          'pic': data.data.fileName
        })
        this.imageUrl = data.data.fileName
      }
    }
  }
}
</script>
