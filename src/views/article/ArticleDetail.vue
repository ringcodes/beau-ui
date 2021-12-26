<template>
  <a-card :title="'标题：'+ record.title">
    <a-row type="flex" justify="center" align="top">
      <a-col span="20">
        <div v-html="record.contentMdView"></div>
      </a-col>
    </a-row>
    <a-drawer
      title="文章设置"
      :width="650"
      :visible="visible"
      @ok="save"
      @close="handleCancel"
    >
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']"/>
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-decorator="['title',{rules: [{required: true,message:'请输入标题'}]}]"/>
        </a-form-item>
        <a-form-item label="图片">
          <ImgUpload ref="imgUpload" @change="handleChange" source="ARTICLE"/>
          <a-input v-decorator="['titlePic']"/>
        </a-form-item>
        <a-form-item label="源地址">
          <a-input v-decorator="['sourceUrl']"/>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-decorator="['description']"/>
        </a-form-item>
        <a-form-item label="主题">
          <a-select v-decorator="['topicId',{rules: [{required: true,message:'请选择主题'}]}]">
            <a-select-option v-for="(item) in topicList" :value="item.id" :key="item.id">{{ item.topicName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="标签">
          <a-checkbox-group v-decorator="['tagList']" class="mt-checkbox-g">
            <template v-for="(item,index) in tagList">
              <a-checkbox :value="item.id" :key="index" class="mt-checkbox">
                {{ item.name }}
              </a-checkbox>
            </template>
          </a-checkbox-group>
          <a-button type="link" @click="()=>this.form.setFieldsValue({tagList:[]})">清除</a-button>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 3 }">
          <a-button type="primary" @click="save">保存</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <div class="tool-btn">
      <a-button @click="handleEdit" type="primary">编辑</a-button>
      <a-button @click="setArticle" type="warging">设置</a-button>
      <a-button @click="handleDel" type="danger">删除</a-button>
      <a-button @click="returnPage" >返回</a-button>
      <a :href="hrefPrefix+record.id+'.html'" target="_blank" class="btn">预览</a>
    </div>
    <a-back-top />
  </a-card>
</template>

<script>
import { getTopicListType, saveArticle, getTagList, getArticle, delArticle } from '@/api/content'
import { ImgUpload } from '@/components'

export default {
  name: 'ArticleEdit',
  components: {
    ImgUpload
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      record: {},
      topicList: [],
      tagList: [],
      visible: false,
      hrefPrefix: process.env.VUE_APP_BASE_API + '/article/'
    }
  },
  methods: {
    setArticle () {
      this.visible = true
      getTopicListType('ARTICLE').then(res => {
        if (res.ok) {
          this.topicList = res.data
        }
      })
      getTagList({}).then(res => {
        this.tagList = res.data
      })
      this.$nextTick(() => {
        this.form.setFieldsValue({
          'id': this.record.id,
          'topicId': this.record.topicId,
          'tagList': this.record.articleLabelVos.map(it => it.id),
          'title': this.record.title,
          'sourceUrl': this.record.sourceUrl,
          'description': this.record.description,
          'titlePic': this.record.titlePic
        })
        this.$refs.imgUpload.setImg([{
          uid: '-1',
          name: this.record.titlePic,
          status: 'done',
          url: this.record.titlePicView
        }])
      })
    },
    handleEdit () {
      if (this.record.articleType === 2) {
        // markdown
        this.$router.push({ path: '/article/add?id=' + this.record.id })
      } else {
        // html
        this.$router.push({ path: '/article/edit?id=' + this.record.id })
      }
    },
    save () {
      this.form.validateFields((err, values) => {
        if (!err) {
          saveArticle(values).then(res => {
            if (res.ok) {
              this.$message.info('保存成功')
              this.visible = false
              this.$router.push({ name: 'ArticleList' })
            }
          })
        }
      })
    },
    handleDel () {
      delArticle(this.$route.query.id).then(res => {
        if (res.ok) {
          this.$message.info('删除成功')
          this.$router.push({ name: 'ArticleList' })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    returnPage () {
      this.$router.push({ name: 'ArticleList' })
    },
    handleChange (info) {
      const file = info[0]
      if (!file || file.status !== 'done') {
        return
      }
      const data = file.response
      if (data.ok) {
        this.form.setFieldsValue({
          'titlePic': data.data.fileName
        })
      }
    }
  },
  activated () {
    const id = this.$route.query.id
    getArticle(id).then(result => {
      const res = result.data
      this.record = res
    })
  }
}
</script>

<style lang="less" scoped>
 .tool-btn {
    position: fixed;
    bottom: 45%;
    right: 25px;
    z-index: 99;
    border-radius: 5px;
    background:rgba(207, 207, 203, 0.6);
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    button {
      margin: 3px 0px;
    }
 }
 .mt-checkbox{
   min-width: 120px;
 }
 .mt-checkbox-g{
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    flex-wrap: wrap;
 }
 .btn{
   padding: 3px 18px;
   background: #fff;
   border-radius: 3px;
   color: #333;
   margin-top: 5px;
 }
</style>

<style>
img{
   max-width: 100%;
 }
 .ant-checkbox-wrapper + .ant-checkbox-wrapper{
   margin: 0;
 }
</style>
