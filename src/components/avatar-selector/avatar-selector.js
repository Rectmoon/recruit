import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'

export default class AvatarSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v => ({
        icon: require(`@/assets/${v}.png`),
        text: v
      }))
    const gridHeader = this.state.text ? (
      <div>
        <span>已选头像</span>
        <img src={this.state.icon} alt="" />
      </div>
    ) : (
      <div>请选择头像</div>
    )

    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            activeStyle={false}
            onClick={e => {
              this.setState(e)
              this.props.selectAvatar(e.text)
            }}
          />
        </List>
      </div>
    )
  }
}
