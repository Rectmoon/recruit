import { Component } from 'react'
import { getUserInfo } from '@/api/user'

export default class auth extends Component {
  componentDidMount() {
    getUserInfo()
  }

  render() {
    return 1
  }
}
