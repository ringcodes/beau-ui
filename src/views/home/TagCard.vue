<template>
  <div class="small-box">
    <div class="content-con">
      <div class="left-area" :style="{background: backColor}">
        <a-icon :type="icon" style="font-size: 36px; color: rgb(255, 255, 255);" class="icon"/>
        </div>
        <div class="right-area" style="width: 64%;">
          <div class="right-main">
            <span  class="title">{{count}}</span>
            <p>{{title}}</p>
        </div>
      </div>
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
  width: 100%;
  height: 120px;
  position: relative;
}
 .content-con {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;
    border-radius: 0px 6px 6px 0px;
    .left-area {
      background: #fff;
      width: 30%;
      float: left;
      height: 100%;
      display: table;
      text-align: center;
      border-radius: 6px 0px 0px 6px;
      .icon {
        display: table-cell;
        vertical-align: middle;
      }
    }
     .right-area {
        float: left;
        height: 100%;
        display: table;
        text-align: center;
        .right-main{
          display: table-cell;
          vertical-align: middle;
          .title{
            font-size: 50px;
            font-weight: 600;
            display: inline-block;
            padding: 5px 0px 9px 0px;
          }
        }
      }
  }
</style>