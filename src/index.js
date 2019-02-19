import React from 'react'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Flex } from 'antd-mobile'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { counter } from './index.redux'

const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {}
  )
)

store.subscribe(() => {
  console.log(store.getState())
})

function Two() {
  return <h2>二营</h2>
}

function Three() {
  return <h2>骑兵连</h2>
}

class Topic extends React.Component {
  render() {
    const topic = this.props.match.params.topic
    return <div>话题 {topic}</div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Flex>
          <Flex.Item>
            <Link to="/">一营</Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/two">二营</Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/three">骑兵连</Link>
          </Flex.Item>
        </Flex>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/two" component={Two} />
          <Route path="/three" component={Three} />
          <Route path="/:topic" component={Topic} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
