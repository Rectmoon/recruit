import { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '@/api/user'
import { withRouter } from 'react-router-dom'
import { loadData } from '@/store/user'

@withRouter
@connect(
  state => state.user,
  { loadData }
)
class auth extends Component {
  componentDidMount() {
    const whiteList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (!whiteList.includes(pathname)) {
      getUserInfo().then(res => {
        if (res.code == 0) {
          this.props.loadData(res.data)
        } else {
          this.props.history.push('/login')
        }
      })
    }
  }

  render() {
    return null
  }
}

export default auth
