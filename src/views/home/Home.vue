<template>
  <div class="home">
    <a-row :gutter="16">
      <a-col :span="6" v-for="(item,key) in data" :key="key">
        <TagCard :title="item.name" :count="item.value" :backColor="colorList[key]" :icon="iconList[key]"></TagCard> 
      </a-col>
    </a-row>
  </div>
</template>

<script>
import TagCard from './TagCard.vue'
import {Row,Col} from 'ant-design-vue'
import { statisticsAcount} from '@/api/content'
export default {
  name: 'Home',
  data(){
    return {
      data: [],
      colorList:['#2599df','#096dd9','#d7890e'],
      iconList: ['read','appstore','user']
    }
  },
  components:{
    TagCard,
    ARow:Row,
    ACol: Col
  },
  mounted(){
    statisticsAcount().then(res=>{
      this.data = res.data;
    })
  }
}
</script>