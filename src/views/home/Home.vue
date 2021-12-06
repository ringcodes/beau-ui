<template>
  <div class="home">
    <a-row :gutter="48">
      <a-col :span="6" v-for="(item,key) in data" :key="key">
        <TagCard :title="item.name" :count="item.value" :backColor="colorList[key]" :icon="iconList[key]"></TagCard>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="mt-bp">
      <a-col :span="12">
        <a-card title="按分类统计">
          <div id="cate-chart"></div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="按时间统计">
          <div id="qushi-chart"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import TagCard from './TagCard.vue'
import { statisticsAcount, qushiChart, gateChart } from '@/api/content'
import { Line, Column } from '@antv/g2plot'

export default {
  name: 'Home',
  data () {
    return {
      data: [],
      qushiData: [],
      cateData: [],
      colorList: [ '#2599df', '#096dd9', '#d7890e', '#b1842c' ],
      iconList: ['read', 'appstore', 'user', 'book']
    }
  },
  components: {
    TagCard
  },
  methods: {
    renderChart (data) {
      const line = new Line('qushi-chart', {
        data,
        height: 300,
        padding: 'auto',
        xField: 'title',
        yField: 'val',
        xAxis: {
          tickCount: 5
        },
        smooth: true,
        meta: {
          title: {
            alias: '日期'
          },
          val: {
            alias: '文章数'
          }
        }
      })
      line.render()
    },
    renderCate (data) {
      const columnPlot = new Column('cate-chart', {
        data,
        height: 300,
        xField: 'topicName',
        yField: 'articleCount',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 0.6
          }
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false
          }
        },
        meta: {
          topicName: {
            alias: '主题'
          },
          articleCount: {
            alias: '文章数'
          }
        }
      })
      columnPlot.render()
    }
  },
  mounted () {
    statisticsAcount().then(res => {
      this.data = res.data
    })
    gateChart().then(res => {
      this.cateData = res.data
      this.renderCate(this.cateData)
    })
    qushiChart().then(res => {
      this.qushiData = res.data
      this.renderChart(this.qushiData)
    })
  }
}
</script>

<style lang="less" scoped>
.mt-bp{
  margin-top: 10px;
}
</style>
