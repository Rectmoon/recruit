import { Component } from 'react'
import { getUserInfo } from '@/api/user'
import { withRouter } from 'react-router-dom'

@withRouter
class auth extends Component {
  componentDidMount() {
    const whiteList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (!whiteList.includes(pathname)) {
      getUserInfo().then(res => {
        if (res.code == 0) {
          console.log(1)
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
