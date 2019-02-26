import React from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getUserList } from '@/store/chatUser'
import UserCard from '@/components/user-card/user-card'

@connect(
  state => state.chatUser,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    return <UserCard userList={this.props.userList} />
  }
}

export default Genius
