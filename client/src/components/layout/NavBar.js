import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import {userId} from '../../jwt'
import {withRouter} from 'react-router'

const NavBar = (props) => {
  const { location, user } = props

  return (
    <div id={'NavBar'}>
      <h1>Freakin' Laser Beams</h1>
      <div className={'NavBar-Options'}>
        {
          user &&
          <div className={'NavBar-Options-username'}> Hello, { user.username }</div>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <NavLink to={'/signup'} className={'NavBar-Link'} activeStyle={{color: '#ff4f00'}}>
            <div id={'NavBar-signup'}>SIGNUP</div>
          </NavLink>
        }
        {
          location.pathname.indexOf('signup') > 0 &&
          <NavLink to={`/login`} className={'NavBar-Link'} activeStyle={{color: '#ff4f00'}}>
            <div id={'NavBar-login'}>LOGIN</div>
          </NavLink>
        }
        {
          location.pathname.indexOf('games/') > 0 &&
          <NavLink to={'/games'} className={'NavBar-Link'} activeStyle={{color: '#ff4f00'}}>
            <div id={'NavBar-games'}>GAMES</div>
          </NavLink>
        }
        {
          /games$/.test(location.pathname) &&
          <NavLink to={'/logout'}>LOG OUT</NavLink>
        }
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(connect(mapStateToProps)(NavBar))
