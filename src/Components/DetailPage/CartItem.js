import React, { Component } from 'react';

export default class CartItem extends Component {
	render() {
		const {
			item,
			addFirstItem,
			increaseItemCount,
			decreaseItemCount,
			cartItemsStatus,
		} = this.props;
		return (
			<React.Fragment>
				<div className="cart-item-container">
					<div className="cart-text-container">
						{item.type === 'veg' ? (
							<span style={{ color: 'green', padding: '0 .3em' }}>
								&#9679;&#8414;
							</span>
						) : (
							<span style={{ color: 'red', padding: '0 .3em' }}>
								&#9679;&#8414;
							</span>
						)}
						<h3>{item.name}</h3>
						<h3> &#8377; {item.cost}</h3>
						<h5>{item.description}</h5>
					</div>
					<div className="cart-img-container">
						<img
							src={
								require('../../assets/cart-item-img.png')
									.default
							}
							alt=""
						/>
						<div className="cart-item-quantity">
							{cartItemsStatus &&
							cartItemsStatus.length > 0 &&
							cartItemsStatus[item._id - 1].noOfItems === 0 ? (
								<div
									className="cart-quantity-zero"
									onClick={() => addFirstItem(item)}
								>
									Add
								</div>
							) : (
								<div className="cart-quantity-multiple">
									<span
										onClick={() => decreaseItemCount(item)}
									>
										-
									</span>
									<span>
										{cartItemsStatus
											? cartItemsStatus[item._id - 1]
													.noOfItems
											: null}
									</span>
									<span
										onClick={() => increaseItemCount(item)}
									>
										+
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="break-line-3"></div>
			</React.Fragment>
		);
	}
}
