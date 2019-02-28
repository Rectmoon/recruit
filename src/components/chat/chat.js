import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, NavBar } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg } from '@/store/chat'
import { getChatId } from '@/utils/chat'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
  }

  handleSubmit() {
    const from = this.props.user.user._id
    const to = this.props.match.params.userid
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: ''
    })
  }

  render() {
    const Item = List.Item
    const userid = this.props.match.params.userid
    const users = this.props.chat.users
    const chatid = getChatId(userid, this.props.user.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)

    return (
      <div id="chat-page">
        <NavBar mode="dark">{userid}</NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`@/assets/${users[v.from].avatar}.png`)
          return v.from == userid ? (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item extra={<img src={avatar} />} className="chat-me">
                {v.content}
              </Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            >
              信息
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
