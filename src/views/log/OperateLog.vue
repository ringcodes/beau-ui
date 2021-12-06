<template>
  <div class="table-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="6" :sm="24">
          <a-form-item label="操作时间">
            <a-range-picker v-model="opTime" format="YYYY-MM-DD">
            </a-range-picker>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="refresh()">查询</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>
    <s-table
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="dataList"
      ref="table"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
    </s-table>
  </div>
</template>

<script>
import { STable } from '@/components'
import { operateLogPage } from '@/api/content'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      queryParam: {},
      opTime: [],
      columns: [
        {
          title: '模块',
          dataIndex: 'businessName',
          width: 200
        }, {
          title: '操作内容',
          dataIndex: 'content'
        }, {
          title: 'IP',
          dataIndex: 'ip',
          width: 200
        }, {
          title: '操作人',
          dataIndex: 'userName',
          width: 150
        }, {
          title: '操作时间',
          dataIndex: 'updateTime',
          width: 180
        }
      ],
      dataList: (parameter) => {
        console.log(this.queryParam.datetime)
        if (this.opTime && this.opTime.length > 1) {
          this.queryParam.operateTimeStart = this.opTime[0].format('YYYY-MM-DD')
          this.queryParam.operateTimeEnd = this.opTime[1].format('YYYY-MM-DD')
        }
        return operateLogPage(Object.assign(parameter, this.queryParam))
      }
    }
  },
  mounted () {
  },
  methods: {
    refresh () {
      this.$refs.table.refresh(true)
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
