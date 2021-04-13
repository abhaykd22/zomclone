import React, { Component } from 'react';
import Pagination from './Pagination';
import RestaurantList from './RestaurantList';

class FilterResult extends Component {
	render() {
		const { restaurantList, totalRes } = this.props;
		return (
			<React.Fragment>
				<section className="result-section">
					<h2 className="matchFound">Total Results : {totalRes}</h2>
					{restaurantList.length > 0 ? (
						restaurantList.map((restaurant) => {
							return (
								<RestaurantList
									key={restaurant._id}
									restaurant={restaurant}
								/>
							);
						})
					) : (
						<div className="filter-no-result">
							<h2>Sorry. No result found</h2>
						</div>
					)}
					<Pagination
						pageHandler={this.props.pageHandler}
						pageCount={this.props.pageCount}
						page={this.props.page}
						pageArrowHandler={this.props.pageArrowHandler}
					/>
				</section>
			</React.Fragment>
		);
	}
}

export default FilterResult;
