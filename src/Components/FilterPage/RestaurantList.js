import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RestaurantList extends Component {
	restaurantOnClickHandler(restaurant) {
		this.props.history.push(`/restaurant?id=${restaurant._id}`);
	}
	render() {
		const { restaurant } = this.props;
		const { thumb, name, locality, address } = restaurant;
		const Cuisine = [];
		restaurant.Cuisine.forEach((element) => {
			Cuisine.push(element.name);
		});
		return (
			<React.Fragment>
				<article
					className="search-result"
					onClick={() => this.restaurantOnClickHandler(restaurant)}
				>
					<div className="sr-upper">
						<div className="sr-upper-left">
							<img src={thumb} alt="" />
						</div>
						<div className="sr-upper-right">
							<h2>{name}</h2>
							<h3>{locality}</h3>
							<p>{address}</p>
						</div>
					</div>
					<div className="break-line" />
					<div className="sr-lower">
						<div className="sr-lower-1">
							<p>
								CUISINES:{' '}
								<span>
									{Cuisine.map((cuisine, index, Cuisine) => {
										return index !== Cuisine.length - 1
											? `${cuisine}, `
											: cuisine;
									})}
								</span>
							</p>
						</div>
						<div className="sr-lower-2">
							<p>
								COST FOR TWO: <span>{restaurant.cost}</span>
							</p>
						</div>
					</div>
				</article>
			</React.Fragment>
		);
	}
}

export default withRouter(RestaurantList);
