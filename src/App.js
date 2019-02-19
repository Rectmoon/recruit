import React, { Component } from 'react'
import 'antd-mobile/dist/antd-mobile.css'
import { Button, List } from 'antd-mobile'

class App extends Component {
  render() {
    const boss = '李云龙'
    return (
      <div>
        <h2>独立团， 团长{boss}</h2>
        <一营 laoda="张大彪" />
        <骑兵连 laoda="孙德胜" />
      </div>
    )
  }
}

class 一营 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solders: ['虎子', '柱子', '王根生']
    }
  }

  addSolder() {
    this.setState({
      solders: [
        ...this.state.solders,
        '新兵单子' + Math.random().toFixed(4) * 10000
      ]
    })
  }

  render() {
    const boss = this.props.laoda
    return (
      <div>
        <h2>一营营长，{boss}</h2>
        <Button type="primary" onClick={() => this.addSolder()}>
          招兵
        </Button>
        <h3>士兵</h3>
        <List>
          {this.state.solders.map((item, i) => (
            <List.Item key={i}>{item}</List.Item>
          ))}
        </List>
      </div>
    )
  }
}

function 骑兵连(props) {
  return <h2>冲啊, 骑兵连连长{props.laoda}</h2>
}

export default App
