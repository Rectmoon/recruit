import React, { Component } from 'react'
import { connect } from 'react-redux'
import Logo from '../../components/logo/logo'
import lyForm from '@/components/lyform'
import { register } from '@/store/user'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile'

const RadioItem = Radio.RadioItem

@connect(
  state => state.user,
  { register }
)
@lyForm
class Register extends Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }

  handleRegister() {
    this.props.register(this.props.state)
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>我是注册</h2>
        <WingBlank>
          {this.props.msg ? (
            <p className="error-msg">{this.props.msg}</p>
          ) : null}
          <List>
            <InputItem
              onChange={v => {
                this.props.handleChange('username', v)
              }}
            >
              用户
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => {
                this.props.handleChange('password', v)
              }}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v => {
                this.props.handleChange('repeatPassword', v)
              }}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
            >
              BOSS
            </RadioItem>
          </List>

          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
