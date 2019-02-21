import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
import App from './App'
import store from './store'

import Auth from '@/components/auth/auth'
import Login from './containers/login/login'
import Register from './containers/register/register'

import * as serviceWorker from './serviceWorker'

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
        <nav>
          <Link to="/">一营</Link>
          <Link to="/two">二营</Link>
          <Link to="/three">骑兵连</Link>
          <Link to="/login">登录</Link>
          <Link to="/register">注册</Link>
        </nav>

        <Auth />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/two" component={Two} />
          <Route path="/three" component={Three} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/:topic" component={Topic} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
