import axios from 'axios';
import React, { Component } from 'react';
import Header from '../Header';
import { withRouter } from 'react-router-dom';

class Wallpaper extends Component {
	constructor(props) {
		super(props);

		this.state = {
			suggestions: [],
			text: '',
			restaurants: [],
		};
	}

	cityHandler = (event) => {
		const cityId = event.target.value;
		// sessionStorage.setItem('city', cityId);
		axios({
			method: 'GET',
			url: `https://zomserver.herokuapp.com/api/zomato/restaurantByCity/${cityId}`,
			headers: { 'Content-Type': 'application/json' },
		})
			.then((result) => {
				this.setState(
					{
						restaurants: result.data.restaurants,
					},
					() => {
						this.restaurantHandler(event);
					}
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	restaurantHandler = (event) => {
		let suggestions = [];
		let { restaurants } = this.state;
		let inputText = '';
		if (event.target.classList.contains('location-search')) {
			suggestions = restaurants;
		} else {
			inputText = event.target.value;
			if (inputText.length >= 0) {
				suggestions = restaurants.filter((restaurant) => {
					return restaurant.name
						.toLowerCase()
						.includes(inputText.toLowerCase());
				});
			}
		}
		this.setState({
			suggestions,
			text: inputText,
		});
	};

	blurRestaurantHandler = (event) => {
		this.setState({
			suggestions: [],
		});
	};

	focusRestaurantHandler = (event) => {
		this.restaurantHandler(event);
	};

	restaurantResultList = () => {
		const { suggestions } = this.state;
		return (
			<ul className="h-rest-search-list">
				{suggestions.map((restaurant, index) => {
					return (
						<React.Fragment key={restaurant._id}>
							<div
								value={restaurant}
								className="h-rest-search-list-container"
								onClick={() =>
									this.restaurantOnClickHandler(restaurant)
								}
							>
								<div className="h-rest-search-list-img-container">
									<img src={restaurant.thumb} alt="no-img" />
								</div>
								<li
									key={restaurant._id}
									className="h-rest-search-list-item"
								>
									<h3 className="h-rest-search-list-name">
										{restaurant.name}
									</h3>
									<h4 className="h-rest-search-list-locality">
										{restaurant.locality}
									</h4>
								</li>
							</div>
							<div className="break-line-2" />
						</React.Fragment>
					);
				})}
			</ul>
		);
	};

	restaurantOnClickHandler(restaurant) {
		this.props.history.push(`/restaurant?id=${restaurant._id}`);
	}

	render() {
		const { cities } = this.props;
		return (
			<React.Fragment>
				<header id="zomato-home">
					<Header place={'home'} />
					{/* Header Content */}
					<div id="home-header-content">
						<div className="logo">e!</div>
						<h1>Find the best restaurants, cafés, and bars</h1>
						<div className="search-bars">
							<form>
								<select
									defaultValue="0"
									className="location-search search-bar"
									onChange={this.cityHandler}
								>
									<option value="0" disabled>
										Please type a location
									</option>
									{cities.map((city) => {
										return (
											<option
												key={city._id}
												value={city.city_id}
											>
												{city.name}, {city.country_name}
											</option>
										);
									})}
								</select>
								<span className="h-restaurant-result-flex">
									<input
										type="text"
										className="restaurant-search search-bar"
										placeholder="Search for restaurants"
										value={this.state.text}
										onChange={this.restaurantHandler}
										onBlur={this.blurRestaurantHandler}
										onFocus={this.focusRestaurantHandler}
									/>
									{this.restaurantResultList()}
								</span>
							</form>
						</div>
					</div>
				</header>
			</React.Fragment>
		);
	}
}

export default withRouter(Wallpaper);
