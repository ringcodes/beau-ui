
export default {
  name: 'Tree',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.localOpenKeys = this.openKeys.slice(0)
  },
  data () {
    return {
      localOpenKeys: []
    }
  },
  methods: {
    handlePlus (item) {
      this.$emit('add', item)
    },
    handleTitleClick (...args) {
      this.$emit('titleClick', { args })
    },

    renderSearch () {
      return (
        <a-search
          placeholder="input search text"
          style="width: 100%; margin-bottom: 1rem"
        />
      )
    },
    renderIcon (icon) {
      return icon && (<a-icon type={icon} />) || null
    },
    renderMenuItem (item) {
      return (
        <a-menu-item key={item.key}>
          { this.renderIcon(item.icon) }
          { item.title }
          <a class="btn" style="width: 20px;z-index:1300" {...{ on: { click: () => this.handlePlus(item) } }}><a-icon type="plus"/></a>
        </a-menu-item>
      )
    },
    renderItem (item) {
      return item.children ? this.renderSubItem(item, item.key) : this.renderMenuItem(item, item.key)
    },
    renderItemGroup (item) {
      const childrenItems = item.children.map(o => {
        return this.renderItem(o, o.key)
      })

      return (
        <a-menu-item-group key={item.key}>
          <template slot="title">
            <span>{ item.title }</span>
            <a-dropdown>
              <a class="btn"><a-icon type="ellipsis" /></a>
              <a-menu slot="overlay">
                <a-menu-item key="1">新增</a-menu-item>
                <a-menu-item key="2">合并</a-menu-item>
                <a-menu-item key="3">移除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          { childrenItems }
        </a-menu-item-group>
      )
    },
    renderSubItem (item, key) {
      const childrenItems = item.children && item.children.map(o => {
        return this.renderItem(o, o.key)
      })

      const title = (
        <span slot="title">
          { this.renderIcon(item.icon) }
          <span>{ item.title }</span>
        </span>
      )

      if (item.group) {
        return this.renderItemGroup(item)
      }
      // titleClick={this.handleTitleClick(item)}
      return (
        <a-sub-menu key={key}>
          { title }
          { childrenItems }
        </a-sub-menu>
      )
    }
  },
  render () {
    const { dataSource, search } = this.$props
    // this.localOpenKeys = openKeys.slice(0)
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })

    return (
      <div class="tree-wrapper">
        { search ? this.renderSearch() : null }
        <a-menu mode="inline" class="custom-tree" {...{ on: { click: item => this.$emit('click', item), 'update:openKeys': val => { this.localOpenKeys = val } } }} openKeys={this.localOpenKeys}>
          { list }
        </a-menu>
      </div>
    )
  }
}
