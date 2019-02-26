import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLink from '../navlink/navlink'
import Boss from '@/components/boss/boss'
import Genius from '@/components/genius/genius'
import Me from '@/components/me/me'

function Msg() {
  return <h2>消息</h2>
}

@connect(state => state.user)
class DashBoard extends Component {
  render() {
    const { user } = this.props
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type == 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type == 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: Me
      }
    ]

    return (
      <div>
        <NavBar className="fixd-header" mode="dard">
          {navList.find(v => v.path == pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>

        <NavLink data={navList} />
      </div>
    )
  }
}

export default DashBoard
