import React from 'react';
import { withRouter } from 'react-router-dom';
class QuickSearchItem extends React.Component {
	handleClick(id) {
		this.props.history.push(`/filter?mealtype=${id}`);
	}

	render() {
		const { mealtype, id } = this.props;
		const { name, content, image } = mealtype;

		return (
			<React.Fragment>
				<div className="qs-option" onClick={() => this.handleClick(id)}>
					<img
						className="qs-option-img"
						src={require('../../' + image).default}
						alt=""
					/>
					<div className="qs-option-content">
						<h3>{name}</h3>
						<p>{content}</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(QuickSearchItem);
