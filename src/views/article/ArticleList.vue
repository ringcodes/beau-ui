<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="4" :sm="24">
          <a-form-item label="标题">
            <a-input v-model="queryParam.title" placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <a-form-item label="状态">
            <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
              <a-select-option v-for="(item, key) in privilegeList" :value="key" :key="key">{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
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
        <a @click="handleDetail(record)">详情</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认要删除吗？" @confirm="() => handleDel(record)">
          <a>删除</a>
        </a-popconfirm>
      </span>
    </s-table>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getArticleList, delArticle } from '@/api/content'
import { PRIVILEGE_TYPE } from '@/store/mutation-types'
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
      form: null,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      privilegeList: PRIVILEGE_TYPE,
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '主题',
          dataIndex: 'topicName'
        },
        {
          title: '来源',
          dataIndex: 'sourceName'
        },
        {
          title: '权限',
          dataIndex: 'privilege'
        },
        {
          title: '类型',
          dataIndex: 'sourceType'
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
        return getArticleList(Object.assign(parameter, this.queryParam))
      }
    }
  },
  mounted () {
  },
  methods: {
    handleAdd () {
      this.$router.push({ path: '/admin/article/edit?id=0' })
    },
    handleEdit (record) {
      this.$router.push({ path: '/admin/article/edit?id=' + record.id })
    },
    handleDel (record) {
      delArticle(record.id).then(res => {
        if (res.ok) {
          this.$message.info('删除成功')
          this.$refs.table.refresh(true)
        }
      })
    },
    handleDetail (record) {
      this.$router.push({ path: '/admin/article/detail?id=' + record.id })
    }
  }
}
</script>
