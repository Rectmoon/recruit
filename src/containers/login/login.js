import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import lyForm from '@/components/lyform'
import { connect } from 'react-redux'
import { login } from '@/store/user'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { login }
)
@lyForm
class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.register = this.register.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }

  handleLogin() {
    this.props.login(this.props.state)
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <h2>我是登录</h2>
        <WingBlank>
          {this.props.msg ? (
            <p className="error-msg">{this.props.msg}</p>
          ) : null}
          <List>
            <InputItem onChange={v => this.props.handleChange('username', v)}>
              用户
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => this.props.handleChange('password', v)}
              type="password"
            >
              密码
            </InputItem>
          </List>
          <Button onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.register()}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
