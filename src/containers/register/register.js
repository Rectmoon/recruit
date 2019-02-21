import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile'

const RadioItem = Radio.RadioItem

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'genuis'
    }
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>我是注册</h2>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
            <WhiteSpace />
            <InputItem>确认密码</InputItem>
            <WhiteSpace />
            <RadioItem checked={this.state.type === 'genuis'}>牛人</RadioItem>
            <RadioItem checked={this.state.type === 'boss'}>BOSS</RadioItem>
          </List>

          <WhiteSpace />
          <Button type="primary" onClick={this.register}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }

  register() {
    console.log(111)
  }
}
