<template>
  <div>
    <a-row>
      <a-col :span="8">
        <div class="menu">
          <div class="tool">
            <a-button type="primary" icon="plus" @click="clickAdd({name:'无'})">新增顶级菜单</a-button>
          </div>
          <a-tree
            :tree-data="treeData"
            :replace-fields="replaceFields"
            blockNode
          >
            <template slot="title" slot-scope="item"> 
              <div class="menu-ext-main">
                <span class="node-title" @click="clickEdit(item)">{{ item.name }} </span>
                <div class="menu-ext">
                  <span class="icon-wrap" @click.stop="clickAdd(item)">
                    <a-icon type="plus" :style="{ fontSize: '15px',color: '#08c' }"/>
                  </span>
                  <a-popconfirm
                    title="确认要删除这个菜单吗？"
                    @confirm="delData(item)"
                  >
                  <span class="icon-wrap">
                    <a-icon type="delete" :style="{ fontSize: '15px', color: '#f13434' }"/>
                  </span>
                  </a-popconfirm>
                </div>
              </div>
            </template>
          </a-tree>
        </div>
      </a-col>
      <a-col :span="8" :offset="1">
        <a-card title="菜单">
          <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
            <a-form-item label="父级" v-show="showType == 3">
              <span>{{form.parentName}}</span>
            </a-form-item>
            <a-form-item label="名称">
              <a-input v-model="form.name"/>
            </a-form-item>
            <a-form-item label="地址">
              <a-input v-model="form.url"/>
            </a-form-item>
            <a-form-item :wrapperCol="{offset: 3}">
              <a-button type="primary" @click="saveData">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { listMenu,saveMenu,delMenu } from '@/api/manage'
import { Tree, Row,Col,Icon,Form,Input,Card,Popconfirm} from 'ant-design-vue'
export default {
  name:'',
  components:{
    ATree: Tree,
    ARow: Row,
    ACol: Col,
    AIcon: Icon,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ACard: Card,
    APopconfirm: Popconfirm
  },
  data(){
    return {
      treeData: [],
      replaceFields: {
        children: 'children',
        title: 'name',
        key: 'id'
      },
      form:{},
      showType: 0,
    }
  },
  methods:{
    listData(){
      listMenu().then(res=>{
        this.treeData = res.data
      })
    },
    clickAdd(item){
      this.form = {
        parentName: item.name,
        parentId: item.id
      }
      this.showType = 3;
    },
    clickEdit(item){
      this.form = {
        name: item.name,
        url: item.url,
        id: item.id,
        parentId: item.parentId
      }
      this.showType= 0;
    },
    saveData(){
      saveMenu(this.form).then(res=>{
        if(res.ok){
          this.$message.success('保存成功');
          this.listData();
          this.form.name = "";
          this.form.url = "";
        }
      })
    },
    delData(item){
      delMenu(item.id).then(res=>{
        if(res.ok){
          this.$message.success('删除成功');
          this.listData();
        }
      })
    },
    onSelect(selectedKeys, {selectedNodes}){
      console.log(selectedKeys,selectedNodes)
    }
  },
  mounted(){
    this.listData();
  }
}
</script>

<style lang="less" scoped>
.menu{
  background: #fff;
  padding: 10px;
}
.tool{
    padding-bottom: 20px;
  }
  .menu-ext-main{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .node-title{
      font-size: 16px;
      flex: 1;
    }
    .menu-ext{
      float: right;
      .icon-wrap{
        padding: 0px 5px;
      }
    }
  }
.menu-form{
  background: #fff;
  padding: 10px;
}
</style>