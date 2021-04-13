import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
	content: {
		maxWidth: '600px',
		margin: 'auto',
		background: '#fbfbfb',
		borderRadius: '20px',
		overflow: 'auto',
	},
	overlay: {
		backgroundColor: 'rgba(255, 255, 255, 0.55)',
	},
};

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSignUpModalOpen: false,
			isLoginModalOpen: false,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		const { place } = this.props;
		const header = document.querySelector('.navbar');
		if (typeof place !== 'undefined') {
			header.style.position = 'absolute';
			header.style.background = 'none';
			header.style.justifyContent = 'flex-end';
			header.style.paddingRight = '101px';
			document.querySelector('#navbar-icon').style.display = 'none';
		}
		Modal.setAppElement('body');
	}

	handleChange = (event, stateVariable) => {
		this.setState({
			[stateVariable]: event.target.value,
		});
	};
	signUpOpen = () => {
		this.setState({
			isSignUpModalOpen: true,
		});
	};
	loginOpen = () => {
		this.setState({
			isLoginModalOpen: true,
		});
	};
	signUpHandler = (event) => {
		const { firstName, lastName, email, password } = this.state;
		const query = {
			firstName,
			lastName,
			email,
			password,
		};
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/auth/signUp`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.status === true) {
					this.setState({
						isSignUpModalOpen: false,
						firstName: '',
						lastName: '',
						email: '',
						password: '',
					});
					alert('success');
				}
			})
			.catch((error) => {
				console.log(error);
				alert('Failure');
			});
		event.preventDefault();
	};

	loginHandler = (event) => {
		const { email, password } = this.state;
		const query = {
			email,
			password,
		};
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/auth/login`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.status === true) {
					this.setState(
						{
							isLoginModalOpen: false,
							firstName: '',
							lastName: '',
							email: '',
							password: '',
							isLoggedIn: result.data.status,
						},
						() => {
							sessionStorage.setItem(
								'isLoggedIn',
								this.state.isLoggedIn
							);
							sessionStorage.setItem('name', result.data.name);
							console.log('setting session');
						}
					);
				}
			})
			.catch((error) => {
				console.log(error);
				alert('Incorrect email or password');
			});
		event.preventDefault();
	};

	cancelHandler = () => {
		this.setState({
			isSignUpModalOpen: false,
			isLoginModalOpen: false,
		});
	};

	logout = () => {
		this.setState({
			isLoggedIn: false,
		});
		sessionStorage.setItem('isLoggedIn', false);
		sessionStorage.removeItem('name');
	};

	onModalClosed = () => {
		this.setState({
			isSignUpModalOpen: false,
			isLoginModalOpen: false,
			lastName: '',
			email: '',
			password: '',
		});
	};

	render() {
		const {
			firstName,
			lastName,
			email,
			password,
			isSignUpModalOpen,
			isLoginModalOpen,
		} = this.state;
		return (
			<React.Fragment>
				<header id="zomato-header">
					<div className="navbar">
						<a id="navbar-icon" href="./home">
							<h1>e!</h1>
						</a>
						<nav id="account">
							{sessionStorage.getItem('isLoggedIn') === 'true' ? (
								<ul>
									<li>
										<button className="no-border-btn">
											{sessionStorage.getItem('name')}
										</button>
									</li>
									<li>
										<button
											className="no-border-btn"
											onClick={this.logout}
										>
											Logout
										</button>
									</li>
								</ul>
							) : (
								<ul>
									<li>
										<button
											className="no-border-btn"
											onClick={this.loginOpen}
										>
											Login
										</button>
									</li>
									<li>
										<button
											className="border-btn"
											onClick={this.signUpOpen}
										>
											Create an account
										</button>
									</li>
								</ul>
							)}
						</nav>
					</div>
				</header>
				<Modal
					isOpen={isSignUpModalOpen}
					style={customStyles}
					onRequestClose={this.cancelHandler}
					onAfterClose={this.onModalClosed}
					shouldCloseOnOverlayClick={true}
				>
					<main id="zomato-signUp">
						<h3>SignUp</h3>
						<form action="" autoComplete="off">
							<div className="signup-input-wrapper">
								<label htmlFor="fname">
									First Name
									<span className="perm-field">*</span>
								</label>
								<input
									type="text"
									value={firstName}
									name="fname"
									id="fname"
									onChange={(event) =>
										this.handleChange(event, 'firstName')
									}
									required
								/>
							</div>
							<div className="signup-input-wrapper">
								<label htmlFor="lname">
									Last name
									<span className="perm-field">*</span>
								</label>
								<input
									type="text"
									value={lastName}
									name="lname"
									id="lname"
									onChange={(event) =>
										this.handleChange(event, 'lastName')
									}
									required
								/>
							</div>
							<div className="signup-input-wrapper">
								<label htmlFor="email">
									Email<span className="perm-field">*</span>
								</label>
								<input
									type="text"
									value={email}
									name="email"
									id="email"
									onChange={(event) =>
										this.handleChange(event, 'email')
									}
									required
								/>
							</div>
							<div className="signup-input-wrapper">
								<label htmlFor="password">
									Password
									<span className="perm-field">*</span>
								</label>
								<input
									type="password"
									value={password}
									name="password"
									id="password"
									onChange={(event) =>
										this.handleChange(event, 'password')
									}
									required
								/>
							</div>
							<input
								className="submit"
								type="submit"
								value="Signup"
								onClick={this.signUpHandler}
							/>
							<button
								className="cancel"
								onClick={this.cancelHandler}
							>
								Cancel
							</button>
						</form>
					</main>
				</Modal>
				<Modal
					isOpen={isLoginModalOpen}
					style={customStyles}
					onRequestClose={this.cancelHandler}
					onAfterClose={this.onModalClosed}
					shouldCloseOnOverlayClick={true}
				>
					<main id="zomato-login">
						<h3>Login</h3>
						<form autoComplete="off" method="post">
							<div className="login-input-wrapper">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									value={email}
									name="email"
									id="email"
									onChange={(event) =>
										this.handleChange(event, 'email')
									}
								/>
							</div>
							<div className="login-input-wrapper">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									value={password}
									name="password"
									id="password"
									onChange={(event) =>
										this.handleChange(event, 'password')
									}
								/>
							</div>
							<input
								className="submit"
								type="submit"
								value="SignIn"
								onClick={this.loginHandler}
							/>
							<input
								className="cancel"
								type="reset"
								value="Cancel"
								onClick={this.cancelHandler}
							/>
						</form>
					</main>
				</Modal>
			</React.Fragment>
		);
	}
}

export default Header;
