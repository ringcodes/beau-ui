/* eslint-disable vue/valid-v-for */
<template>
  <page-view :title="false">
    <a-row :gutter="24">
      <a-col
        :sm="24"
        :md="12"
        :xl="6"
        :style="{ marginBottom: '12px' }"
        v-for="item in cardData"
        :key="item">
        <chart-card :title="item.name" :total="item.value">
          <a-tooltip :title="item.desc" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
    </a-row>
    <a-card>
      <a-row>
        <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
          <div id="artileChart" />
        </a-col>
      </a-row>
    </a-card>
  </page-view>
</template>

<script>
import { ChartCard } from '@/components'
import { PageView } from '@/layouts'
import { acount, chartData } from '@/api/content'
import { Row, Col, Card, Tooltip, Icon } from 'ant-design-vue'
import { Line } from '@antv/g2plot'

export default {
  name: 'Workplace',
  components: {
    PageView,
    ChartCard,
    ARow: Row,
    ACol: Col,
    ACard: Card,
    ATooltip: Tooltip,
    AIcon: Icon
  },
  data () {
    return {
      barData: [],
      cardData: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  mounted () {
    acount().then(res => {
      if (res.ok) {
        this.cardData = res.data
      }
    })
    chartData().then(res => {
      if (res.ok) {
        this.barData = res.data
      }
    })
  },
  methods: {
    getProjects () {
      this.$http.get('/list/search/projects')
        .then(res => {
          this.projects = res.result && res.result.data
          this.loading = false
        })
    },
    initChart (data) {
      const line = new Line('artileChart', {
        data: data,
        padding: 'auto',
        height: 260,
        xAxis: {
          type: 'timeCat',
          mask: 'MM-dd',
          tickInterval: 2
        },
        xField: 'timestamp',
        yField: 'value',
        smooth: true,
        legend: {
          layout: 'horizontal',
          position: 'bottom'
        }
      })
      line.render()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
