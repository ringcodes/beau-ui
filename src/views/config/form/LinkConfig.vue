<template>
  <div>
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
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认要删除吗？" @confirm="() => handleDel(record)">
          <a>删除</a>
        </a-popconfirm>
      </span>
    </s-table>
    <a-modal
      title="新增"
      style="top: 20px;"
      :width="450"
      v-model="visible"
      @ok="handleSubmit"
    >
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
        <a-input v-model="addForm.id" v-show="false"/>
        <a-form-item
          label="标题">
          <a-input v-model="addForm.configName"/>
        </a-form-item>
        <a-form-item
          label="链接">
          <a-input v-model="addForm.configContent"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { Form, Input, Spin, Select, Icon,Modal } from 'ant-design-vue'
import { saveConfig, listConfigPage,delConfig } from '@/api/manage'
import { STable } from '@/components'

export default {
  name: 'LinkConfig',
  data () {
    return {
      visible: false,
      id: null,
      queryParam: {
        configTypeEnum: 'WEB_CONFIG',
        configKeyEnum: 'LINK'
      },
      addForm: {},
      columns:[
        {
          title: 'ID',
          dataIndex: 'id'
        },{
          title: '标题',
          dataIndex: 'configName'
        },{
          title: '链接',
          dataIndex: 'configContent'
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataList: (parameter) => {
        return listConfigPage(this.queryParam)
      }
    }
  },
  components: {
    STable,
    ASpin: Spin,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea,
    AIcon: Icon,
    AModal: Modal
  },
  methods: {
    add () {
      this.visible = true;
    },
    delLink (item) {
      delConfig(item.id).then(res =>{
        if(res.ok){
          this.$message.info('删除成功')
        }
      })
    },
    handleSubmit () {
      var values = {
        id: this.addForm.id,
        configType: "WEB_CONFIG",
        configKey: "LINK",
        configName: this.addForm.configName,
        configContent: this.addForm.configContent
      }
      saveConfig(values).then(res => {
        this.$message.info('保存成功');
        this.$refs.table.refresh(true);
        this.visible = false;
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
 .link-item{
   margin-bottom: 15px;
 }
 .dynamic-delete-button{
   padding-left: 10px;
   font-size: 24px;
   color: red;
 }
</style>
