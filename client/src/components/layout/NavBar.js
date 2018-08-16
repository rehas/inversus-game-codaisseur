import './NavBar.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import {userId} from '../../jwt'
import {withRouter} from 'react-router'
import Button from 'material-ui/Button'

const NavBar = (props) => {
  const { location, history, user } = props

  return (
    <div id={'NavBar'}>
      <h1>Freakin' Laser Beams</h1>
      {
        user &&
        <div color="inherit"> { user.firstName }</div>
      }
      {
        location.pathname.indexOf('signup') > 0 &&
        <NavLink to={'/signup'} className={'NavBar-Link'} activeStyle={{color: '#ff4f00'}}>
          <div id={'NavBar-signup'}>
            signup
            {/*<FontAwesomeIcon icon="music" />*/}
          </div>
        </NavLink>
      }
      {
        location.pathname.indexOf('login') > 0 &&
        <NavLink to={`/login`} className={'NavBar-Link'} activeStyle={{color: '#ff4f00'}}>
          <div id={'NavBar-login'}>
            login
            {/*<FontAwesomeIcon icon="user-circle" />*/}
          </div>
        </NavLink>
      }
      {
        location.pathname.indexOf('games/') > 0 &&
        <NavLink to={'/games'} className={'NavBar-Link'} activeStyle={{color: '#ff4f00'}}>
          <div id={'NavBar-games'}>
            games
            {/*<FontAwesomeIcon icon="comment" />*/}
          </div>
        </NavLink>
      }
      {
        /games$/.test(location.pathname) &&
        <NavLink to={'/logout'}>Log out</NavLink>
      }
    </div>
  )
}
const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(connect(mapStateToProps)(NavBar))
