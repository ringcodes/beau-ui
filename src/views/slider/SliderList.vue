<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="6" :sm="24">
          <a-form-item label="位置">
            <a-select placeholder="请选择" v-model="queryParam.sliderType">
              <a-select-option value="">全部</a-select-option>
              <a-select-option v-for="item in positionList" :value="item.name" :key="item.name">{{ item.desc }}</a-select-option>
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

    <s-table
      size="default"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="dataList"
      ref="table"
    >
      <span slot="pic" slot-scope="text">
        <img :src="text" alt="" class="img-list">
      </span>
      <span slot="target" slot-scope="text">
        <a :href="text" target="_blank">{{text}}</a>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认要删除吗？" @confirm="() => handleDel(record)">
          <a class="btn-red">删除</a>
        </a-popconfirm>
      </span>
    </s-table>
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
          <a-select v-decorator="['sliderType', {  rules: [{ required: true, message: '请选择类型' }] }]" >
            <a-select-option v-for="item in positionList" :value="item.name" :key="item.name">{{ item.desc }}</a-select-option>
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
      positionList: [],
      columns: [
        {
          title: '图片',
          dataIndex: 'pic',
          width: 200,
          scopedSlots: { customRender: 'pic' }
        },{
          title: '标题',
          dataIndex: 'title'
        },{
          title: '地址',
          dataIndex: 'target',
          width: 250,
          scopedSlots: { customRender: 'target' }
        }, {
          title: '位置',
          dataIndex: 'positionName',
          width: 120
        },{
          title: '创建时间',
          dataIndex: 'updateTime',
          width: 180
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataList: (parameter) => {
        return getSliderList(Object.assign(parameter, this.queryParam))
      }
    }
  },
  mounted () {
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
      this.$refs.table.refresh(true)
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

<style lang="less" scoped>
.img-list{
  width: 200px;
  max-height: 150px;
}
</style>