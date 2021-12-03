<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="16">
        <a-col :md="6" :sm="24">
          <a-form-item label="名称">
            <a-input placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="24">
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
    <s-table
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="dataList"
      ref="table"
      :pageSize="6"
    >
      <span slot="pic" slot-scope="text">
        <img :src="text" alt="" class="img-list">
      </span>
      <span slot="target" slot-scope="text">
        <a :href="text" target="_blank">{{text}}</a>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="editTopic(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认要删除吗？" @confirm="() => handleDel(record)">
          <a class="btn-red">删除</a>
        </a-popconfirm>
      </span>
    </s-table>
    <a-modal
      :title="title"
      style="top: 20px;"
      :width="600"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']"/>
        </a-form-item>
        <a-form-item
          label="名称">
          <a-input
            v-decorator="['topicName', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
        <a-form-item
          label="类型">
          <a-select
            v-decorator="['topicType', { initialValue:'1', rules: [{ required: true, message: '请选择类型' }] }]" >
            <a-select-option value="1">文章</a-select-option>
            <a-select-option value="2">软件</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="位置">
          <a-select
            v-decorator="['topicPosition', { initialValue:'1', rules: [{ required: true, message: '请选择类型' }] }]" >
            <a-select-option :value="item.value" v-for="(item,idx) in posList" :key="idx">{{ item.desc }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="图片">
          <s-upload ref="imgUpload" @change="handleChange" :source="2"/>
          <a-input v-decorator="['topicPic']" placeholder="手动输入图片地址"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { STable, ImgUpload } from '@/components'
import { getTopicList, saveTopic, delTopic, listTopicPos } from '@/api/content'
import { Row, Col, Form, Modal, Select, Input, Pagination, Avatar, Popconfirm, Divider } from 'ant-design-vue'
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
      form: this.$form.createForm(this),
      loading: false,
      queryParam: {},
      data: [],
      imageUrl: [],
      uploadData: {
        source: 1,
        code: ''
      },
      posList: [],
      title: '新增',
      columns: [
        {
          title: '图片',
          dataIndex: 'topicPicView',
          width: 200,
          scopedSlots: { customRender: 'pic' }
        }, {
          title: '名称',
          dataIndex: 'topicName',
          width: 220
        }, {
          title: '类型',
          dataIndex: 'topicTypeName',
          width: 250
        }, {
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
        return getTopicList(Object.assign(parameter, this.queryParam))
      }
    }
  },
  mounted () {
    listTopicPos().then(res => {
      this.posList = res.data
    })
  },
  methods: {
    handleAdd () {
      this.title = '新增'
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    editTopic (record) {
      this.title = '编辑'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.imgUpload.setImg([{
          uid: '-1',
          name: record.topicName,
          status: 'done',
          url: record.topicPicView
        }])
        this.form.setFieldsValue({
          'id': record.id,
          'topicName': record.topicName,
          'topicType': record.topicType,
          'topicPic': record.topicPic
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
              this.refresh()
            }
          })
        }
      })
    },
    handleDel (item) {
      delTopic(item.id).then(res => {
        this.$message.info('删除成功')
        this.refresh()
      })
    },
    refresh () {
      this.$refs.table.refresh(true)
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
  }
}
</script>
<style lang="less" scoped>
.img-list{
  max-width: 120px;
  max-height: 80px;
}
</style>
