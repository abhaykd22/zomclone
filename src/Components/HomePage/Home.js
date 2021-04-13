import React, { Component } from 'react';
import axios from 'axios';
import '../../Styles/styles.css';
import Wallpaper from './Wallpaper';
import QuickSearches from './QuickSearches';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: [],
			mealtypes: [],
		};
	}
	componentDidMount() {
		axios
			.get(`https://zomserver.herokuapp.com/api/zomato/getCities`)
			.then((result) => {
				this.setState({
					cities: result.data.cities,
				});
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get(`https://zomserver.herokuapp.com/api/zomato/getMeals`)
			.then((result) => {
				this.setState({
					mealtypes: result.data.meals,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { cities, mealtypes } = this.state;
		return (
			<div>
				<Wallpaper key={cities._id} cities={cities} />
				<QuickSearches key={mealtypes._id} mealtypes={mealtypes} />
			</div>
		);
	}
}

export default Home;
