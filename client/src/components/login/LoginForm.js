import React, {PureComponent} from 'react'

export default class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
			<form className={'login-form'} onSubmit={this.handleSubmit}>
				<div className={'login-username'}>
					<label htmlFor="username">Username</label>
					<input type="username" name="username" id="username" value={
						this.state.username || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" value={
						this.state.password || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Login</button>
			</form>
		)
	}
}
