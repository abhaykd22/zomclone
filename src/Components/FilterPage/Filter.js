import React, { Component } from 'react';
import '../../Styles/styles.css';
import queryString from 'query-string';
import axios from 'axios';
import FilterOptions from './FilterOptions';
import FilterResult from './FilterResult';
import Header from '../Header';

class Filter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			restaurantList: [],
			pageCount: 0,
			cities: [],
			cityId: '',
			cuisines: [],
			mealtypeId: '',
			totalRes: 0,
			costForTwo: '',
			sort: 0,
			page: 1,
			nextPage: {},
			previousPage: {},
		};
	}

	componentDidMount() {
		const queryParams = queryString.parse(this.props.location.search);
		const { mealtype } = queryParams;
		this.setState({
			mealtypeId: mealtype.toString(),
		});
		const req = { mealtype: mealtype };
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/zomato/getRestaurants`,
			headers: { 'Content-Type': 'application/json' },
			data: req,
		})
			.then((result) => {
				if (result.data.pagination.next) {
					this.setState({
						nextPage: result.data.pagination.next,
					});
				} else {
					this.setState({
						nextPage: {},
					});
				}
				if (result.data.pagination.prev) {
					this.setState({
						previousPage: result.data.pagination.prev,
					});
				} else {
					this.setState({
						previousPage: {},
					});
				}
				this.setState({
					restaurantList: result.data.restaurants,
					totalRes: result.data.totalDocs,
					pageCount: result.data.totalPages,
				});
			})
			.catch((error) => {
				console.log(error);
			});
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
		console.log('component did mount : ' + this.state.pageCount);
	}

	componentDidUpdate() {
		const { pageCount, page } = this.state;
		if (pageCount === 0 || pageCount === 1) {
			if (pageCount === 1) {
				document
					.querySelector('.nav-2-item')
					.classList.add('clicked-nav');
			}
			document.querySelectorAll('.nav-2-item-arrow')[0].disabled = true;
			document.querySelectorAll('.nav-2-item-arrow')[1].disabled = true;
			document.querySelectorAll('.nav-2-item-arrow')[0].style.cursor =
				'not-allowed';
			document.querySelectorAll('.nav-2-item-arrow')[1].style.cursor =
				'not-allowed';
			document
				.querySelectorAll('.nav-2-item-arrow')[0]
				.classList.add('disabled-nav');
			document
				.querySelectorAll('.nav-2-item-arrow')[1]
				.classList.add('disabled-nav');
		} else {
			if (page === 1) {
				//pageCount>=2 && page=1
				document
					.querySelector('.nav-2-item')
					.classList.add('clicked-nav');
				document.querySelectorAll(
					'.nav-2-item-arrow'
				)[0].disabled = true;
				document.querySelectorAll(
					'.nav-2-item-arrow'
				)[1].disabled = false;
				document.querySelectorAll('.nav-2-item-arrow')[0].style.cursor =
					'not-allowed';
				document.querySelectorAll('.nav-2-item-arrow')[1].style.cursor =
					'pointer';
				document
					.querySelectorAll('.nav-2-item-arrow')[0]
					.classList.add('disabled-nav');
				document
					.querySelectorAll('.nav-2-item-arrow')[1]
					.classList.remove('disabled-nav');
			} else if (page === pageCount) {
				document.querySelectorAll(
					'.nav-2-item-arrow'
				)[0].disabled = false;
				document.querySelectorAll(
					'.nav-2-item-arrow'
				)[1].disabled = true;
				document.querySelectorAll('.nav-2-item-arrow')[0].style.cursor =
					'pointer';
				document.querySelectorAll('.nav-2-item-arrow')[1].style.cursor =
					'not-allowed';
				document
					.querySelectorAll('.nav-2-item-arrow')[0]
					.classList.remove('disabled-nav');
				document
					.querySelectorAll('.nav-2-item-arrow')[1]
					.classList.add('disabled-nav');
			} else {
				document.querySelectorAll(
					'.nav-2-item-arrow'
				)[0].disabled = false;
				document.querySelectorAll(
					'.nav-2-item-arrow'
				)[1].disabled = false;
				document.querySelectorAll('.nav-2-item-arrow')[0].style.cursor =
					'pointer';
				document.querySelectorAll('.nav-2-item-arrow')[1].style.cursor =
					'pointer';
				document
					.querySelectorAll('.nav-2-item-arrow')[0]
					.classList.remove('disabled-nav');
				document
					.querySelectorAll('.nav-2-item-arrow')[1]
					.classList.remove('disabled-nav');
			}
		}
	}

	cityHandler = (event) => {
		this.setState({
			cityId: event.target.value,
		});
		const { mealtypeId, cuisines, costForTwo, sort, page } = this.state;
		const tempCityId = event.target.value;
		//Building query to be given in axios
		const query = {};
		if (mealtypeId) {
			query['mealtype'] = mealtypeId;
		}
		if (cuisines.length > 0) {
			query['Cuisine'] = cuisines.join(',');
		}
		if (costForTwo) {
			query['cost'] = costForTwo;
		}
		if (sort) {
			query['sort'] = sort;
		}
		query['page'] = 1;
		query['city'] = tempCityId;
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/zomato/getRestaurants`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.pagination.next) {
					this.setState({
						nextPage: result.data.pagination.next,
					});
				} else {
					this.setState({
						nextPage: {},
					});
				}
				if (result.data.pagination.prev) {
					this.setState({
						previousPage: result.data.pagination.prev,
					});
				} else {
					this.setState({
						previousPage: {},
					});
				}
				this.setState({
					restaurantList: result.data.restaurants,
					totalRes: result.data.totalDocs,
					pageCount: result.data.totalPages,
					page: 1,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	cuisineHandler = (event) => {
		const {
			mealtypeId,
			cuisines,
			cityId,
			costForTwo,
			sort,
			page,
		} = this.state;
		let currentCuisine;
		if (event.target) {
			currentCuisine = event.target.value;
		}
		let tempCuisines = cuisines;
		//Building query to be given in axios
		const query = {};
		if (mealtypeId) {
			query['mealtype'] = mealtypeId;
		}
		if (cityId) {
			query['city'] = cityId;
		}
		if (costForTwo) {
			query['cost'] = costForTwo;
		}
		if (sort) {
			query['sort'] = sort;
		}
		query['page'] = 1;
		if (
			tempCuisines.length === 0 ||
			tempCuisines.indexOf(currentCuisine) === -1
		) {
			tempCuisines.push(currentCuisine);
		} else {
			const tempIndex = tempCuisines.indexOf(currentCuisine);
			tempCuisines.splice(tempIndex, 1);
		}
		let cuisineString = tempCuisines.join(',');
		query['Cuisine'] = cuisineString;

		this.setState({
			cuisines: tempCuisines,
		});
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/zomato/getRestaurants`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.pagination.next) {
					this.setState({
						nextPage: result.data.pagination.next,
					});
				} else {
					this.setState({
						nextPage: {},
					});
				}
				if (result.data.pagination.prev) {
					this.setState({
						previousPage: result.data.pagination.prev,
					});
				} else {
					this.setState({
						previousPage: {},
					});
				}
				this.setState({
					restaurantList: result.data.restaurants,
					totalRes: result.data.totalDocs,
					pageCount: result.data.totalPages,
					page: 1,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	costHandler = (event) => {
		const {
			mealtypeId,
			cuisines,
			cityId,
			costForTwo,
			sort,
			page,
		} = this.state;
		//Building query to be given in axios
		const query = {};
		if (mealtypeId) {
			query['mealtype'] = mealtypeId;
		}
		if (cuisines.length > 0) {
			query['Cuisine'] = cuisines.join(',');
		}
		if (cityId) {
			query['city'] = cityId;
		}
		if (sort) {
			query['sort'] = sort;
		}
		query['page'] = 1;
		query['cost'] = event.target.value;

		this.setState({
			costForTwo: event.target.value,
		});
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/zomato/getRestaurants`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.pagination.next) {
					this.setState({
						nextPage: result.data.pagination.next,
					});
				} else {
					this.setState({
						nextPage: {},
					});
				}
				if (result.data.pagination.prev) {
					this.setState({
						previousPage: result.data.pagination.prev,
					});
				} else {
					this.setState({
						previousPage: {},
					});
				}
				this.setState({
					restaurantList: result.data.restaurants,
					totalRes: result.data.totalDocs,
					pageCount: result.data.totalPages,
					page: 1,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	sortHandler = (event) => {
		const {
			mealtypeId,
			cuisines,
			cityId,
			costForTwo,
			sort,
			page,
		} = this.state;
		//Building query to be given in axios
		const query = {};
		if (mealtypeId) {
			query['mealtype'] = mealtypeId;
		}
		if (cuisines.length > 0) {
			query['Cuisine'] = cuisines.join(',');
		}
		if (cityId) {
			query['city'] = cityId;
		}
		if (costForTwo) {
			query['cost'] = costForTwo;
		}
		if (page) {
			query['page'] = page;
		}
		query['sort'] = parseInt(event.target.value);

		this.setState({
			sort: parseInt(event.target.value),
		});
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/zomato/getRestaurants`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				this.setState({
					restaurantList: result.data.restaurants,
					totalRes: result.data.totalDocs,
					pageCount: result.data.totalPages,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	pageHandler = (event) => {
		const {
			mealtypeId,
			cuisines,
			cityId,
			costForTwo,
			sort,
			page,
			pageCount,
		} = this.state;

		//Adding clicked button functionality
		document
			.querySelectorAll('.nav-2-item')
			[page - 1].classList.remove('clicked-nav');
		document
			.querySelectorAll('.nav-2-item')
			[event.target.textContent - 1].classList.add('clicked-nav');

		//Building query to be given in axios
		const query = {};
		if (mealtypeId) {
			query['mealtype'] = mealtypeId;
		}
		if (cuisines.length > 0) {
			query['Cuisine'] = cuisines.join(',');
		}
		if (cityId) {
			query['city'] = cityId;
		}
		if (sort) {
			query['sort'] = sort;
		}
		if (costForTwo) {
			query['cost'] = costForTwo;
		}
		query['page'] = parseInt(event.target.textContent);

		this.setState({
			page: parseInt(event.target.textContent),
		});
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/zomato/getRestaurants`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.pagination.next) {
					this.setState({
						nextPage: result.data.pagination.next,
					});
				} else {
					this.setState({
						nextPage: {},
					});
				}
				if (result.data.pagination.prev) {
					this.setState({
						previousPage: result.data.pagination.prev,
					});
				} else {
					this.setState({
						previousPage: {},
					});
				}
				this.setState({
					restaurantList: result.data.restaurants,
					totalRes: result.data.totalDocs,
					pageCount: result.data.totalPages,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	pageArrowHandler = (event) => {
		const {
			mealtypeId,
			cuisines,
			cityId,
			costForTwo,
			sort,
			page,
			nextPage,
			previousPage,
			pageCount,
		} = this.state;
		//Building query to be given in axios
		const query = {};
		let curPage;
		if (mealtypeId) {
			query['mealtype'] = mealtypeId;
		}
		if (cuisines.length > 0) {
			query['Cuisine'] = cuisines.join(',');
		}
		if (cityId) {
			query['city'] = cityId;
		}
		if (sort) {
			query['sort'] = sort;
		}
		if (costForTwo) {
			query['cost'] = costForTwo;
		}
		curPage = page;
		query['page'] = curPage;
		if (event.target.textContent.toString() === '>') {
			if (nextPage) {
				query['page'] = curPage + 1;
				document
					.querySelectorAll('.nav-2-item')
					[curPage - 1].classList.remove('clicked-nav');
				document
					.querySelectorAll('.nav-2-item')
					[curPage].classList.add('clicked-nav');
				curPage++;
			}
		} else {
			if (previousPage) {
				query['page'] = curPage - 1;
				document
					.querySelectorAll('.nav-2-item')
					[curPage - 1].classList.remove('clicked-nav');
				document
					.querySelectorAll('.nav-2-item')
					[curPage - 2].classList.add('clicked-nav');
				curPage--;
			}
		}

		this.setState({
			page: curPage,
		});
		axios({
			method: 'POST',
			url: `https://zomserver.herokuapp.com/api/zomato/getRestaurants`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.pagination.next) {
					this.setState({
						nextPage: result.data.pagination.next,
					});
				} else {
					this.setState({
						nextPage: {},
					});
				}
				if (result.data.pagination.prev) {
					this.setState({
						previousPage: result.data.pagination.prev,
					});
				} else {
					this.setState({
						previousPage: {},
					});
				}
				this.setState({
					restaurantList: result.data.restaurants,
					totalRes: result.data.totalDocs,
					pageCount: result.data.totalPages,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	render() {
		const {
			restaurantList,
			totalRes,
			cities,
			pageCount,
			page,
		} = this.state;
		return (
			<div>
				<Header />
				<main>
					<div className="my-search-container">
						<div className="search-heading">
							<h1>Restaurants You've Searched for </h1>
						</div>
						<div className="search-page-flex">
							<FilterOptions
								cities={cities}
								cityHandler={this.cityHandler}
								cuisineHandler={this.cuisineHandler}
								costHandler={this.costHandler}
								sortHandler={this.sortHandler}
							/>
							<FilterResult
								totalRes={totalRes}
								restaurantList={restaurantList}
								pageHandler={this.pageHandler}
								pageArrowHandler={this.pageArrowHandler}
								pageCount={pageCount}
								page={page}
							/>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default Filter;
