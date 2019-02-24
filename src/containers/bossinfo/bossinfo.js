import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateUserInfo } from '@/store/user'
import { NavBar, Icon, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '@/components/avatar-selector/avatar-selector'

@connect(
  state => state.user,
  { updateUserInfo }
)
class Bossinfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: ''
    }
  }

  handleChange(k, v) {
    this.setState({
      [k]: v
    })
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar mode="dark" icon={<Icon type="left" />}>
          Bossinfo
        </NavBar>

        <AvatarSelector
          selectAvatar={t => {
            this.setState({
              avatar: t
            })
          }}
        />

        <InputItem onChange={v => this.handleChange('title', v)}>
          招聘职位
        </InputItem>

        <InputItem onChange={v => this.handleChange('company', v)}>
          公司名称
        </InputItem>

        <InputItem onChange={v => this.handleChange('money', v)}>
          职位薪资
        </InputItem>

        <TextareaItem
          onChange={v => this.handleChange('desc', v)}
          title="职位要求"
          rows={3}
          autoHeight
        />

        <Button
          type="primary"
          onClick={() => {
            this.props.updateUserInfo(this.state)
          }}
        >
          保存
        </Button>
      </div>
    )
  }
}

export default Bossinfo
