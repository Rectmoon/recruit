import React, { Component } from 'react'
import './logo.css'
import LogoImg from '../../assets/logo.png'

export default class Login extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={LogoImg} alt="" width="50" height="50" />
      </div>
    )
  }
}
