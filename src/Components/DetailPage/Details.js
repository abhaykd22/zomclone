import React, { Component } from 'react';
import Header from '../Header';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../Styles/styles.css';
import breakfast from '../../assets/breakfast.png';
import queryString from 'query-string';
import axios from 'axios';
import Modal from 'react-modal';
import CartItem from './CartItem';

const customStyles = {
	content: {
		maxWidth: '660px',
		margin: 'auto',
		background: '#fbfbfb',
		borderRadius: '20px',
		overflow: 'auto',
	},
	overlay: {
		backgroundColor: 'rgba(255, 255, 255, 0.55)',
	},
};

class DetailsContact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			restaurant: {},
			isCartOpen: false,
			cartItems: [],
			cartItemsStatus: [
				{ _id: '1', noOfItems: 0, totalCost: 0 },
				{ _id: '2', noOfItems: 0, totalCost: 0 },
				{ _id: '3', noOfItems: 0, totalCost: 0 },
				{ _id: '4', noOfItems: 0, totalCost: 0 },
				{ _id: '5', noOfItems: 0, totalCost: 0 },
			],
			totalSubCost: 0,
			totalItems: 0,
		};
	}

	componentDidMount() {
		const queryParams = queryString.parse(this.props.location.search);
		const { id } = queryParams;
		axios({
			method: 'GET',
			url: `https://zomserver.herokuapp.com/api/zomato/restaurantById/${id}`,
		})
			.then((result) => {
				this.setState({
					restaurant: result.data.restaurant,
				});
			})
			.catch((err) => {
				console.log(err);
			});

		//Getting menu items
		axios({
			method: 'GET',
			url: `https://zomserver.herokuapp.com/api/zomato/getMenuItems`,
		})
			.then((result) => {
				this.setState({
					cartItems: result.data.items,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	cancelHandler = () => {
		this.setState({
			isCartOpen: false,
		});
	};

	placingOrderHandler = () => {
		this.setState({
			isCartOpen: true,
		});
	};

	addFirstItem = (item) => {
		const itemsArray = this.state.cartItemsStatus;
		let index = this.state.cartItemsStatus.findIndex(
			(element) => element._id === item._id
		);

		console.log(index);
		const itemQuantity = itemsArray[index].noOfItems;
		const itemCost = itemsArray[index].totalCost;
		itemsArray[index] = {
			_id: item._id,
			noOfItems: itemQuantity + 1,
			totalCost: itemCost + item.cost,
		};
		this.setState({
			cartItemsStatus: itemsArray,
			totalSubCost: this.state.totalSubCost + item.cost,
			totalItems: this.state.totalItems + 1,
		});
	};

	decreaseItemCount = (item) => {
		const itemsArray = this.state.cartItemsStatus;
		let index;
		itemsArray.forEach((arrayItem, i) => {
			if (item._id === arrayItem._id) {
				index = i;
			}
		});
		const itemQuantity = itemsArray[index].noOfItems;
		const itemCost = itemsArray[index].totalCost;
		itemsArray[index] = {
			_id: item._id,
			noOfItems: itemQuantity - 1,
			totalCost: itemCost - item.cost,
		};
		this.setState({
			cartItemsStatus: itemsArray,
			totalSubCost: this.state.totalSubCost - item.cost,
			totalItems: this.state.totalItems - 1,
		});
	};
	increaseItemCount = (item) => {
		const itemsArray = this.state.cartItemsStatus;
		let index;
		itemsArray.forEach((arrayItem, i) => {
			if (item._id === arrayItem._id) {
				index = i;
			}
		});
		const itemQuantity = itemsArray[index].noOfItems;
		const itemCost = itemsArray[index].totalCost;
		itemsArray[index] = {
			_id: item._id,
			noOfItems: itemQuantity + 1,
			totalCost: itemCost + item.cost,
		};
		this.setState({
			cartItemsStatus: itemsArray,
			totalSubCost: this.state.totalSubCost + item.cost,
			totalItems: this.state.totalItems + 1,
		});
	};

	makePayment = () => {
		if (
			sessionStorage.getItem('isLoggedIn') === 'false' ||
			sessionStorage.getItem('isLoggedIn') === null
		) {
			alert('You have to be logged in to place order');
		} else {
			this.getData({
				amount: this.state.totalSubCost,
				email: 'masterdwivedi@gmail.com',
				mobileNo: '8839961142',
			})
				.then((response) => {
					var information = {
						action:
							'httpss://securegw-stage.paytm.in/order/process',
						params: response.checkSumresponse,
					};
					this.takeMeToPaymentGateway(information);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	isObj = (data) => {
		return typeof data === 'object';
	};

	isDate = (data) => {
		return Object.prototype.toString.call(data) === '[object Date]';
	};

	stringifyMyParam = (param) => {
		if (this.isObj(param) && !this.isDate(param)) {
			return JSON.stringify(param);
		} else {
			return param;
		}
	};

	buildForm = (details) => {
		const { action, params } = details;

		const form = document.createElement('form');
		form.setAttribute('method', 'post');
		form.setAttribute('action', action);

		Object.keys(params).forEach((key) => {
			const input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', key);
			input.setAttribute('value', this.stringifyMyParam(params[key]));
			form.appendChild(input);
		});

		return form;
	};

	takeMeToPaymentGateway = (details) => {
		//take user to payment gateway
		const form = this.buildForm(details);
		document.body.appendChild(form);
		form.submit();
		form.remove();
	};

	getData = (data) => {
		return fetch(`https://zomserver.herokuapp.com/api/zomato/payment`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const {
			restaurant,
			isCartOpen,
			cartItems,
			totalItems,
			cartItemsStatus,
			totalSubCost,
		} = this.state;
		return (
			<div>
				<Header />
				<main id="details-content">
					<div className="my-img-container ">
						<div className="details-img">
							<button>Click to see Image Gallery</button>
						</div>
					</div>
					<div className="my-container">
						<div className="details-content-head">
							<img src={breakfast} alt="" />
							<h2>{restaurant.name}</h2>
						</div>
						<Tabs>
							<TabList>
								<Tab>Overview</Tab>
								<Tab>Contact</Tab>
								<button onClick={this.placingOrderHandler}>
									Place Online order
								</button>
							</TabList>

							<TabPanel>
								<div className="details-overview">
									<h3>About this place</h3>
									<h4>Cuisine</h4>
									<p>
										{restaurant._id !== undefined
											? restaurant.Cuisine.map(
													(
														cuisine,
														index,
														Cuisine
													) => {
														return index + 1 ===
															Cuisine.length
															? cuisine.name
															: `${cuisine.name},`;
													}
											  )
											: null}
									</p>
									<h4>Average Cost</h4>
									<p>
										{restaurant.cost} for two people
										(approx.)
									</p>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="details-content">
									<h4>Phone Number</h4>
									<p className="content-pno">
										{' '}
										{restaurant.contact_number ||
											'+91 114004566'}
									</p>
									<h3>{restaurant.name}</h3>
									<p>{restaurant.address}</p>
								</div>
							</TabPanel>
						</Tabs>
					</div>
				</main>
				<Modal
					isOpen={isCartOpen}
					style={customStyles}
					onRequestClose={this.cancelHandler}
					shouldCloseOnOverlayClick={true}
				>
					<h2 className="restaurant-heading-cart">
						{restaurant.name}
					</h2>
					<div>
						{cartItems.map((item) => (
							<CartItem
								key={item._id}
								item={item}
								addFirstItem={this.addFirstItem}
								increaseItemCount={this.increaseItemCount}
								decreaseItemCount={this.decreaseItemCount}
								totalItems={totalItems}
								cartItemsStatus={cartItemsStatus}
							/>
						))}
					</div>
					<div className="cart-footer-container">
						<div className="cart-cost-section">
							<h3 className="cart-">
								Subtotal<span>&#8377;{totalSubCost}</span>
							</h3>
						</div>
						<div className="cart-pay-section">
							<button
								class="cart-pay-button"
								onClick={this.makePayment}
							>
								Pay Now
							</button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default DetailsContact;
