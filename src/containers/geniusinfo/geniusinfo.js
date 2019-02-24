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
class GeniusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
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
          牛人完善信息页
        </NavBar>

        <AvatarSelector
          selectAvatar={t => {
            this.setState({
              avatar: t
            })
          }}
        />

        <InputItem onChange={v => this.handleChange('title', v)}>
          求职岗位
        </InputItem>

        <TextareaItem
          onChange={v => this.handleChange('desc', v)}
          rows={3}
          autoHeight
          title="个人见解"
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

export default GeniusInfo
