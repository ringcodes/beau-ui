<template>
  <div class="">
    <div class="table-wrapper">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :md="6" :sm="24">
            <a-form-item label="名称">
              <a-input placeholder="请输入" v-model="queryParam.topicName"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="类型">
              <a-select placeholder="请选择" :default-value="null" v-model="queryParam.topicType">
                <a-select-option :value="null">全部</a-select-option>
                <a-select-option :value="item.name" v-for="(item,idx) in listTopicType" :key="idx">{{ item.desc }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="显示位置">
              <a-select placeholder="请选择" :default-value="null" v-model="queryParam.topicPositionEnum">
                <a-select-option :value="null">全部</a-select-option>
                <a-select-option :value="item.name" v-for="(item,idx) in posList" :key="idx">{{ item.desc }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="listData">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">添加</a-button>
      </div>
    </div>
    <div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: flex-start;">
      <div class="topic-body" v-for="(item,idx) in data.list" :key="idx">
        <div class="topic-img" v-if="item.topicPicView">
          <img :src="item.topicPicView" alt="">
        </div>
        <div class="topic-img" style="background: #eee;" v-else>
        </div>
        <div class="topic-title">
          <div class="topic-title-name">
            <div>{{ item.topicName }}</div>
            <div><a-tag color="pink">{{ item.topicType.desc }}</a-tag></div>
          </div>
          <div class="topic-title-item">
            <span>位置: </span><span>{{ item.topicPosition.desc }}</span>
          </div>
          <div>
            <span>时间: </span><span>{{ item.updateTime }}</span>
          </div>
        </div>
        <div class="topic-tag">
          <span class="btn-list" @click="handleSort(item,idx,true)"><a-icon type="arrow-left" /></span>
          <span class="btn-list" @click="handleSort(item,idx,false)"><a-icon type="arrow-right" /></span>
          <span class="btn-list" @click="editTopic(item)"><a-icon type="edit" /></span>
          <span class="btn-list" @click="handleDel(item)"><a-icon type="delete" class="btn-red"/></span>
        </div>
      </div>
    </div>
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
        <a-form-item label="名称">
          <a-input v-decorator="['topicName', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
        <a-form-item label="类型">
          <a-radio-group v-decorator="['topicType', { initialValue:1, rules: [{ required: true, message: '请选择类型' }] }]">
            <a-radio :value="item.name" v-for="(item,idx) in listTopicType" :key="idx">{{ item.desc }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="位置">
          <a-radio-group v-decorator="['topicPosition', { initialValue:1, rules: [{ required: true, message: '请选择类型' }] }]" @change="changePos">
            <a-radio :value="item.name" v-for="(item,idx) in posList" :key="idx">{{ item.desc }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="图片">
          <s-upload ref="imgUpload" @change="handleChange" source="TOPIC"/>
          <span>{{ topicPositionTips }}</span>
          <a-input v-decorator="['topicPic']" placeholder="手动输入图片地址"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { STable, ImgUpload } from '@/components'
import { getTopicList, saveTopic, delTopic, listTopicPos, listTopicType, topicSort } from '@/api/content'
export default {
  name: 'TableList',
  components: {
    STable,
    SUpload: ImgUpload
  },
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      loading: false,
      queryParam: {
        pageSize: 100
      },
      data: [],
      imageUrl: [],
      uploadData: {
        source: 1,
        code: ''
      },
      topicPositionTips: '',
      listTopicType: [],
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
          dataIndex: 'topicType.desc',
          width: 250
        }, {
          title: '位置',
          dataIndex: 'topicPosition.desc',
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
      ]
    }
  },
  mounted () {
    listTopicPos().then(res => {
      this.posList = res.data
    })
    listTopicType().then(res => {
      this.listTopicType = res.data
    })
    this.listData()
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
          'topicType': record.topicType.name,
          'topicPic': record.topicPic,
          'topicPosition': record.topicPosition.name
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
    },
    changePos (val) {
      this.posList.map(it => {
        if (it.name === val.target.value) {
          this.topicPositionTips = it.value
        }
      })
    },
    listData () {
      getTopicList(this.queryParam).then(res => {
        this.data = res.data
      })
    },
    handleSort (item, sort, pre) {
      if (sort === 0 && pre) {
        this.$message.error('不能往前排序了')
        return
      }
      topicSort({
        id: item.id,
        preId: pre ? this.data.list[sort - 1].id : 0,
        postId: pre ? 0 : this.data.list[sort + 1].id,
        sort: sort + 1,
        pre: pre
      }).then(res => {
        console.log(res)
        this.listData()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.img-list{
  max-width: 120px;
  max-height: 80px;
}
.topic-body{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 5px;
  width: 24%;
  background: #fff;
  margin-bottom: 20px;
  border: 1px solid #d3d2d2;
  position: relative;
  margin-right: 10px;
  .topic-img{
    width: 190px;
    overflow: hidden;
    height: 120px;
    >img{
      width: 100%;
      height: 100%;
    }
  }
  .topic-title{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding-left: 10px;
    .topic-title-name{
      flex: 1;
      font-weight: 500;
    }
    .topic-title-item{

    }
  }
  .topic-tag{
    position: absolute;
    top: 0;
    right: 0;
    .btn-list{
      padding: 2px 5px;
      margin-right: 2px;
      border-radius: 3px;
      color: #2b84cd;
      background: #ecf4fb;
      cursor: pointer;
    }
  }
}
</style>
