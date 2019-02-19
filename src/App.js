import React, { Component } from 'react'
import { Button, List } from 'antd-mobile'
import { addCount, decCount, addCountAsync } from './index.redux'
import { connect } from 'react-redux'

@connect(
  state => ({ num: state }),
  { addCount, decCount, addCountAsync }
)
class App extends Component {
  render() {
    const boss = '李云龙'
    const { num, addCount, decCount, addCountAsync } = this.props
    return (
      <div>
        <h2>独立团， 团长{boss}</h2>
        <一营 laoda="张大彪" />
        <骑兵连 laoda="孙德胜" />
        <p>
          现有机枪<strong>{num}</strong>把
        </p>
        <Button onClick={addCount}>申请武器</Button>
        <Button onClick={decCount}>上交武器</Button>
        <Button onClick={addCountAsync}>异步处理</Button>
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

  handleDelete(i) {
    const { solders } = this.state
    solders.splice(i, 1)
    this.setState({ solders })
  }

  render() {
    const boss = this.props.laoda
    return (
      <div>
        <h2>一营营长，{boss}</h2>
        <Button size="small" type="primary" onClick={() => this.addSolder()}>
          招兵
        </Button>
        <h3>士兵</h3>
        <List>
          {this.state.solders.map((item, i) => (
            <List.Item key={i}>
              {item}
              <Button onClick={() => this.handleDelete(i)}>x</Button>
            </List.Item>
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
