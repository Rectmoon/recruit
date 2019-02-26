import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import c from '@/utils/cookie'
import { logout } from '@/store/user'

@connect(
  state => state.user,
  { logout }
)
class Me extends React.Component {
  constructor(props) {
    super(props)
  }

  handleLogout() {
    const alert = Modal.alert
    alert('注销', '确认退出吗?', [
      {
        text: '取消',
        onPress: () => {}
      },
      {
        text: '确认',
        onPress: () => {
          c.clear('userid')
          this.props.logout()
        }
      }
    ])
  }

  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user.username ? (
      <div>
        <Result
          img={
            <img
              src={require(`@/assets/${props.user.avatar}.png`)}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={this.props.user.username}
          message={
            this.props.user.type == 'boss' ? this.props.user.company : null
          }
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {props.user.title}
            {props.user.desc.split('\n').map((v, i) => (
              <Brief key={i}>{v}</Brief>
            ))}
            {props.user.money ? <div>薪资:{props.user.money}</div> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List className="my-list">
          <Item onClick={() => this.handleLogout()}>退出登录</Item>
        </List>
      </div>
    ) : (
      <Redirect to={props.redirectTo} />
    )
  }
}

export default Me
