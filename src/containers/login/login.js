import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

export default class Login extends Component {
  render() {
    return (
      <div>
        <Logo />
        <h2>我是登录</h2>

        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
          </List>
          <Button>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.register()}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}
