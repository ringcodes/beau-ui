<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="6" :sm="24">
          <a-form-item label="名称">
            <a-input placeholder="请输入名称"/>
          </a-form-item>
        </a-col>
        <a-col :md="3" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="refresh">查询</a-button>
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
      :width="600"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']"/>
        </a-form-item>
        <a-form-item
          label="名称"
        >
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getTagPage, saveTag, delTag } from '@/api/content'
import { Row, Col, Form, Modal, Select, Input, Popconfirm, Divider } from 'ant-design-vue'

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
    APopconfirm: Popconfirm,
    ADivider: Divider
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
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '标签名',
          dataIndex: 'name'
        },
        {
          title: '创建人',
          dataIndex: 'createName'
        },
        {
          title: '创建时间',
          dataIndex: 'updateTime',
          sorter: true
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataList: (parameter) => {
        return getTagPage(Object.assign(parameter, this.queryParam))
      }
    }
  },
  mounted () {
  },
  methods: {
    handleAdd () {
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    handleEdit (record) {
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          'id': record.id,
          'name': record.name
        })
      })
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          saveTag(values).then(res => {
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
      delTag(item.id).then(res => {
        this.$message.info('删除成功')
        this.refresh()
      })
    },
    refresh () {
      this.$refs.table.refresh(true)
    }
  }
}
</script>
