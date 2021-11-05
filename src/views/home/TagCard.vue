<template>
  <div class="small-box" :style="{background: backColor}">
    <div class="inner">
      <h3>{{count}}</h3>
      <p>{{title}}</p>
    </div>
    <div class="icon">
      <a-icon :type="icon"></a-icon>
    </div>
  </div>
</template>
<script>
import { Icon } from 'ant-design-vue'
export default {
  name: 'TagCard',
  components:{
    AIcon: Icon
  },
  props: {
    title:{
      type: String,
      required: true
    },
    count:{
      type: Number,
      required: true
    },
    backColor:{
      type: String,
      default: '#00c0ef'
    },
    icon:{
      type: String,
      default: ''
    },
  }
}
</script>
<style lang="less" scoped>
.small-box {
    border-radius: 2px;
    position: relative;
    display: block;
    margin-bottom: 20px;
    color: #fff;
    .inner{
      padding: 10px;
    }
    h3{
      font-size: 38px;
      font-weight: bold;
      margin: 0 0 10px 0;
      white-space: nowrap;
      padding: 0;
      color: #fff;
    }
    &:hover{
     .icon {
          font-size: 95px;
      }
    }
    .icon{
      -webkit-transition: all .3s linear;
      -o-transition: all .3s linear;
      transition: all .3s linear;
      position: absolute;
      top: -10px;
      right: 10px;
      z-index: 0;
      font-size: 90px;
      color: rgba(0,0,0,0.15);
    }
}
</style>