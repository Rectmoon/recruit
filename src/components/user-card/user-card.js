import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

export default class UserCard extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userList.map(v =>
          v.avatar ? (
            <Card key={v._id}>
              <Header
                title={v.username + 111}
                thumb={require(`@/assets/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Body>
                {v.type === 'boss' ? <div>公司</div> : null}
                {v.desc.split('\n').map(d => (
                  <div key={d}>{d}</div>
                ))}
                {v.type == 'boss' ? <div>薪资:{v.money}</div> : null}
              </Body>
            </Card>
          ) : null
        )}
      </WingBlank>
    )
  }
}
