<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="16" class="query-driver">
        <a-col :md="6" :sm="24">
          <a-form-item label="标题">
            <a-input v-model="queryParam.title" placeholder="请输入标题"/>
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="24">
          <a-form-item label="主题">
            <a-select v-model="queryParam.topicId" placeholder="请选择主题" :filter-option="filterOption" show-search>
              <a-select-option v-for="(item, key) in topicList" :value="item.id" :key="key">{{ item.topicName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <a-form-item label="状态">
            <a-select v-model="queryParam.publishStatus" placeholder="请选择状态">
              <a-select-option v-for="(item, key) in privilegeList" :value="key" :key="key">{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="24">
          <a-form-item label="标签">
            <a-select mode="multiple" v-model="queryParam.tagList" placeholder="请选择标签">
              <a-select-option v-for="item in tagList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" class="query-driver">
        <a-col :md="6" :sm="24">
          <a-form-item label="标记">
            <a-select v-model="queryParam.flagType" placeholder="请选择标记">
              <a-select-option v-for="(item, key) in flagTypeList" :value="key" :key="key">{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="2" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>
    <div class="table-operator">
      <a-dropdown @visibleChange="visibleChange">
        <span>
          <a-button type="primary">新增<a-icon :type="menuTypeIcon" /></a-button>
        </span>
        <a-menu slot="overlay" @click="handleAdd">
          <a-menu-item key="html">
            <a href="javascript:;">富文本</a>
          </a-menu-item>
          <a-menu-item key="markdown">
            <a href="javascript:;">Markdown</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <s-table
      size="default"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="dataList"
      ref="table"
    >
    <span slot="detailAction" slot-scope="text, record">
        <a @click="handleDetail(record)">预览</a>
    </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleDetail(record)">预览</a>
        <a-divider type="vertical" />
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认要删除吗？" @confirm="() => handleDel(record)">
          <a class="btn-red">删除</a>
        </a-popconfirm>
      </span>
    </s-table>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getArticleList, delArticle,getTopicListType,getTagList } from '@/api/content'
import { PRIVILEGE_TYPE,FLAG_TYPE } from '@/store/mutation-types'
import { Row, Col, Form, Modal, Select, Input, Popconfirm, Divider,Dropdown,Menu,Icon,Tag } from 'ant-design-vue'

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
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AIcon: Icon,
    ATag: Tag
  },
  data () {
    return {
      visible: false,
      form: null,
      topicList:[],
      tagList: [],
      // 查询参数
      queryParam: {},
      privilegeList: PRIVILEGE_TYPE,
      flagTypeList: FLAG_TYPE,
      menuTypeIcon: 'caret-down',
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 50
        },{
          title: '标题',
          dataIndex: 'title'
        },{
          title: '主题',
          dataIndex: 'topicName',
          width: 150
        },{
          title: '类型',
          dataIndex: 'articleType',
          width: 80,
          customRender: (val) =>{
            if(val == 2){
              return <a-tag color="green" class="tag-cls">markdown</a-tag>
            } else {
              return <a-tag color="orange" class="tag-cls">富文本</a-tag>
            }
          }
        },{
          title: '状态',
          dataIndex: 'publishStatus',
          width: 80,
          customRender: (val) =>{
            if(val == 2){
              return <a-tag color="green" class="tag-cls">markdown</a-tag>
            } else {
              return <a-tag color="orange" class="tag-cls">富文本</a-tag>
            }
          }
        },{
          title: '创建人',
          dataIndex: 'createName',
          width: 100
        },{
          title: '创建时间',
          dataIndex: 'publishTime',
          width: 180
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
    getTopicListType(1).then(res => {
      if (res.ok) {
        this.topicList = res.data
      }
    });
    getTagList({}).then(res => {
        this.tagList = res.data
    });
  },
  methods: {
    handleAdd (e) {
      if(e.key === 'html'){
        this.$router.push({ path: '/article/edit?id=0' })
      } else if(e.key === 'markdown'){
        this.$router.push({ path: '/article/add?id=0' })
      } else {
        this.$message.error('文章类型不支持');
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleEdit (record) {
      if(record.articleType === 2){
        // markdown
        this.$router.push({ path: '/article/add?id=' + record.id })
      } else {
        // html
        this.$router.push({ path: '/article/edit?id=' + record.id })
      }
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
      this.$router.push({ path: '/article/detail?id=' + record.id })
    },
    visibleChange(visible){
      if(visible){
        this.menuTypeIcon = 'caret-up'
      } else{
        this.menuTypeIcon = 'caret-down'
      }
    }
  }
}
</script>

<style lang="less" >
.query-driver{
  margin-bottom: 10px;
}
.tag-cls{
  width:72px;
  text-align:center;
}
</style>