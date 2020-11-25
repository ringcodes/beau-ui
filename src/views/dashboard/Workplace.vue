/* eslint-disable vue/valid-v-for */
<template>
  <page-view :title="false">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '12px' }" v-for="item in cardData">
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
          <bar :data="barData" title="文章分布图" />
        </a-col>
      </a-row>
    </a-card>
  </page-view>
</template>

<script>
import { Bar, ChartCard } from '@/components'
import { PageView } from '@/layouts'
import { acount, chartData } from '@/api/content'
import { Row, Col, Card, Tooltip, Icon } from 'ant-design-vue'

export default {
  name: 'Workplace',
  components: {
    PageView,
    Bar,
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
