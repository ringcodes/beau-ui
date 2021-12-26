<template>
  <div class="table-wrapper">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="add">添加</a-button>
    </div>
    <s-table
      :rowKey="(record) => record.configMd5"
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
import { saveConfig, listConfigPage, delConfig } from '@/api/manage'
import { STable } from '@/components'

export default {
  name: 'LinkConfig',
  data () {
    return {
      visible: false,
      id: null,
      form: this.$form.createForm(this),
      queryParam: {
        configTypeEnum: 'WEB_CONFIG',
        configKeyEnum: 'LINK',
        queryContent: true
      },
      addForm: {},
      columns: [
        {
          title: '标题',
          dataIndex: 'configName'
        }, {
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
        return listConfigPage(Object.assign(parameter, this.queryParam))
      }
    }
  },
  components: {
    STable
  },
  methods: {
    add () {
      this.visible = true
      this.addForm = {}
    },
    handleEdit (item) {
      this.addForm = item
      this.visible = true
    },
    handleDel (item) {
      delConfig(item.id).then(res => {
        if (res.ok) {
          this.$message.info('删除成功')
          this.$refs.table.refresh(true)
        }
      })
    },
    handleSubmit () {
      var values = {
        id: this.addForm.id,
        configType: 'WEB_CONFIG',
        configKey: 'LINK',
        configName: this.addForm.configName,
        configContent: this.addForm.configContent,
        configMd5: this.addForm.configMd5
      }
      saveConfig(values).then(res => {
        this.$message.info('保存成功')
        this.$refs.table.refresh(true)
        this.visible = false
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
