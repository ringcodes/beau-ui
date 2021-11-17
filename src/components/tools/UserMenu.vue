<template>
  <div class="user-wrapper">
    <div class="content-box">
      <notice-icon class="action"/>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar()"/>
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="2">
            <a href="javascript:;" @click="()=>{this.form.resetFields();this.visible = true}">
              <a-icon type="lock"/>
              <span>修改密码</span>
            </a>
          </a-menu-item>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <a-modal
      title="修改密码"
      style="top: 20px;"
      :width="600"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']"/>
        </a-form-item>
        <a-form-item label="原密码">
          <a-input v-decorator="['oldPassword', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
        <a-form-item label="新密码">
          <a-input v-decorator="['newPassword', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input v-decorator="['newPasswordAgain', { rules: [{ required: true, message: '请输入名称' }] }]"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import { modifyPassword } from '@/api/manage'

import { Icon, Dropdown, Avatar, Menu, Modal,Form,Input } from 'ant-design-vue'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    AIcon: Icon,
    ADropdown: Dropdown,
    AAvatar: Avatar,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input
  },
  data(){
    return {
      visible: false,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout () {
      const that = this
      Modal.confirm({
        title: '提示',
        content: '真的要退出登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    },
    handleOk(){
      this.form.validateFields((err, values) => {
        if (!err) {
          modifyPassword(values).then(() => {
              this.$message.info('修改成功')
              this.visible = false
          }).catch((res) => this.$message.error(res.msg))
        }
      })
    }
  }
}
</script>
