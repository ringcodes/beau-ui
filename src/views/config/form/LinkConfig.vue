<template>
  <div>
    <a-input v-model="id" v-show="false"/>
    <div v-for="(item,index) in linkList" :key="index" class="link-item">
      名称：<a-input v-model="linkList[index].name" style="width:220px;"/>
      <span style="padding-left:30px;">链接：<a-input v-model="linkList[index].url" style="width:500px;"/></span>
      <a-icon
        v-if="linkList.length > 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        @click="() => remove(index)"
      />
    </div>
    <div>
      <a-button type="dashed" style="width: 50%" @click="add">
        <a-icon type="plus" /> 新增
      </a-button>
    </div>
    <div style="margin-top:20px;margin-left:40px;">
      <a-button type="primary" @click="handleSubmit">保存</a-button>
    </div>
  </div>
</template>

<script>
import { Form, Input, Spin, Select, Icon } from 'ant-design-vue'
import { saveConfig, getConfigType } from '@/api/manage'

export default {
  name: 'LinkConfig',
  data () {
    return {
      id: null,
      linkList: []
    }
  },
  components: {
    ASpin: Spin,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea,
    AIcon: Icon
  },
  methods: {
    show () {
      getConfigType('LINK').then(res => {
        if (res.ok) {
          this.id = res.data.id
          this.linkList = JSON.parse(res.data.content)
        }
      })
    },
    add () {
      this.linkList.push({})
    },
    remove (i) {
      this.linkList.splice(i, 1)
    },
    handleSubmit () {
      var values = {
        id: this.id,
        config_type: "BASE",
        config_key: "LINK",
        config_name: '友情链接',
        content: JSON.stringify(this.linkList)
      }
      saveConfig(values).then(res => {
        this.$message.info('保存成功')
      })
    }
  },
  mounted () {
    this.show()
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
