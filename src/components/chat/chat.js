import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg } from '@/store/chat'

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
    return (
      <div>
        {this.props.chat.chatmsg.map((item, i) => {
          return <p key={i}>{item.content}</p>
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
