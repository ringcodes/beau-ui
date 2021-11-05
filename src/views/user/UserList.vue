<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="16">
        <a-col :md="6" :sm="24">
          <a-form-item label="用户名">
            <a-input placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <a-form-item label="状态">
            <a-select placeholder="请选择" default-value="0">
              <a-select-option value="0">全部</a-select-option>
              <a-select-option value="1">禁用</a-select-option>
              <a-select-option value="2">正常</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="refresh()">查询</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>
    <div class="table-operator">
    </div>
    <s-table
      size="default"
      :columns="columns"
      :rowKey="(record) => record.id"
      :data="loadData"
      ref="table"
    >
      <span slot="action" slot-scope="text, record">
        <a-popconfirm title="确认要禁用吗？" @confirm="() => handleForbid(record)">
          <a class="btn-red">禁用</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a @click="handleRole(record)">授权</a>
      </span>
    </s-table>
    <a-drawer
      title="用户设置"
      placement="right"
      :closable="false"
      :visible="visible"
      width="600"
      @close="onClose"
    >
      <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="角色" :wrapper-col="{ span: 12 }">
          <a-select placeholder="请选择" v-model="dataFrom.role">
            <a-select-option value="1">普通用户</a-select-option>
            <a-select-option value="3">管理员</a-select-option>
            <a-select-option value="10">超级管理员</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="性别">
          <a-select placeholder="" v-model="dataFrom.sex">
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="0">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4 }">
          <a-button type="primary">保存</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getUserList,forbidUser } from '@/api/manage'
import { Row, Col, Form, Modal, Select, Input, Popconfirm, Divider,Tag,Drawer } from 'ant-design-vue'

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
    ADivider: Divider,
    ATag: Tag,
    ADrawer: Drawer
  },
  data () {
    return {
      visible: false,
      queryParam: {},
      dataFrom:{},
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        }, {
          title: '用户名',
          dataIndex: 'name'
        }, {
          title: '性别',
          dataIndex: 'sex',
          customRender: text => {
            if (text === 1) { return '男' } else { return '女' }
          }
        }, {
          title: '手机号',
          dataIndex: 'mobile'
        }, {
          title: '邮箱',
          dataIndex: 'email'
        }, {
          title: '状态',
          dataIndex: 'status',
          customRender: (val) =>{
            if(val == 2){
              return <a-tag color="pink" >禁用</a-tag>
            } else {
              return <a-tag color="green" >正常</a-tag>
            }
          }
        }, {
          title: '更新时间',
          dataIndex: 'updateTime',
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getUserList(parameter)
      },
    }
  },
  created () {
  },
  methods: {
    handleRole () {
      this.visible = true;
    },
    handleForbid(item){
      forbidUser(item.id).then(res=>{
        if(res.ok){
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    refresh () {
      this.$refs.table.refresh(true)
    },
    saveOK(){

    },
    onClose(){
      this.visible = false;
    }
  }
}
</script>
