<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <div>
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="账号"
            v-decorator="[
              'username', {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }], validateTrigger: 'change'}]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码"
            v-decorator="[
              'password', {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
          <router-link
            :to="{ name: 'recover', params: { user: 'aaa'} }"
            class="forge-password"
            style="float: right;"
          >忘记密码
          </router-link>
        </a-form-item>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >登录
          </a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { Form, Icon, Input, Checkbox } from 'ant-design-vue'

export default {
  components: {
    TwoStepCaptcha,
    AForm: Form,
    AFormItem: Form.Item,
    AIcon: Icon,
    AInput: Input,
    ACheckbox: Checkbox
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      query:{}
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleSubmit (e) {
      e.preventDefault()
      const {
        state,
        Login
      } = this
      this.form.validateFields((err, values) => {
        if (!err) {
          Login(values)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        }
      })
    },
    loginSuccess (res) {
      if(this.query && this.query.redirect){
        this.$router.push({ path: this.query.redirect }).catch(err => {});
      } else {
        this.$router.push({ path: '/home' }).catch(err => {});
      }
    },
    requestFailed (err) {
      this.$message.error(err.msg || '请求出现错误，请稍后再试')
    }
  },
  mounted(){
    this.query =this.$route.query
  }
}
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
