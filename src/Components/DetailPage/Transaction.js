import React, { Component } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

export class Transaction extends Component {
	constructor(props) {
		super(props);

		this.state = {
			success: '0',
		};
	}

	componentDidMount() {
		const transactionStatus = queryString.parse(this.props.location.search);
		const { success } = transactionStatus;
		if (success === '1') {
			this.setState({
				success: '1',
			});
		}
	}
	render() {
		const { success } = this.state;
		setTimeout(() => {
			this.props.history.push(`/home`);
		}, 6000);
		return (
			<React.Fragment>
				{success === '1' ? (
					<h1
						style={{
							fontSize: '30px',
							marginTop: '50px',
							color: 'green',
							textAlign: 'center',
							fontWeight: '400',
						}}
					>
						Transaction Successfull
					</h1>
				) : (
					<h1
						style={{
							fontSize: '30px',
							marginTop: '50px',
							color: 'red',
							textAlign: 'center',
							fontWeight: '400',
						}}
					>
						Transaction Failed
					</h1>
				)}

				<h1
					style={{
						fontSize: '25px',
						marginTop: '40px',
						color: '#192f60',
						textAlign: 'center',
						fontWeight: '300',
					}}
				>
					Redirecting to Home page in few seconds....
				</h1>
			</React.Fragment>
		);
	}
}

export default withRouter(Transaction);
