import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'

class Header extends Component {
	renderContent() {
		console.log(this.props.auth)
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href='/auth/google'>Login with Google</a>
					</li>
				)
			default:
				return [
					<li key='1'><Payments /></li>,
					<li key='3' style={{ margin: '0 10px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key='2'><a href='/api/logout'>Logout</a></li>
				]
		}
	}


	render() {
		return (
			<div className = 'ui secondary pointing menu'>
				<Link 
				to={this.props.auth ? '/surveys': '/'} 
				className='item'
				>
					Emaily
				</Link>
				<div className='right menu'>
					<ul>{this.renderContent()}</ul>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header)