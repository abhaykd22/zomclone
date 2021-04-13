import React, { Component } from 'react';

class FilterOptions extends Component {
	render() {
		const {
			cities,
			cuisineHandler,
			cityHandler,
			costHandler,
			sortHandler,
		} = this.props;
		return (
			<React.Fragment>
				<div className="s-filter-container">
					<h3>Filters</h3>
					<div className="s-location-container">
						<h4>Select Location</h4>
						<select
							defaultValue="0"
							name="location"
							onChange={cityHandler}
						>
							<option value="0">Select Location</option>
							{cities.map((city) => {
								return (
									<option key={city._id} value={city.city_id}>
										{city.name}, {city.country_name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="s-cuisine-container">
						<h4>Cuisine</h4>
						<input
							type="checkbox"
							id="north-indian"
							value={1}
							onChange={cuisineHandler}
						/>
						<label htmlFor="north-indian">North Indian</label>
						<br />
						<input
							type="checkbox"
							id="south-indian"
							value={2}
							onChange={cuisineHandler}
						/>
						<label htmlFor="south-indian">South Indian</label>
						<br />
						<input
							type="checkbox"
							id="chinese"
							value={3}
							onChange={cuisineHandler}
						/>
						<label htmlFor="chinese">Chinese</label>
						<br />
						<input
							type="checkbox"
							id="fast-food"
							value={4}
							onChange={cuisineHandler}
						/>
						<label htmlFor="fast-food">Fast Food</label>
						<br />
						<input
							type="checkbox"
							id="street-food"
							value={5}
							onChange={cuisineHandler}
						/>
						<label htmlFor="street-food">Street Food</label>
					</div>
					<div className="s-cost-container">
						<h4>Cost For Two</h4>
						<input
							type="radio"
							id="0-500"
							value="0-500"
							name="cost-for-two"
							onChange={costHandler}
						/>{' '}
						<label htmlFor="0-500">Less than ₹ 500</label>
						<br />
						<input
							type="radio"
							id="500-1000"
							value="500-1000"
							name="cost-for-two"
							onChange={costHandler}
						/>{' '}
						<label htmlFor="500-1000">₹ 500 to ₹ 1000</label>
						<br />
						<input
							type="radio"
							id="1000-1500"
							value="1000-1500"
							name="cost-for-two"
							onChange={costHandler}
						/>{' '}
						<label htmlFor="1000-1500">₹ 1000 to ₹ 1500</label>
						<br />
						<input
							type="radio"
							id="1500-2000"
							value="1500-2000"
							name="cost-for-two"
							onChange={costHandler}
						/>{' '}
						<label htmlFor="1500-2000">₹ 1500 to ₹ 2000</label>
						<br />
						<input
							type="radio"
							id="2000+"
							value="2000+"
							name="cost-for-two"
							onChange={costHandler}
						/>{' '}
						<label htmlFor="2000+">₹ 2000+</label>
					</div>
					<div className="s-sort-container">
						<h3>Sort</h3>
						<input
							type="radio"
							name="sort"
							id="ltoh"
							value="1"
							onChange={sortHandler}
						/>
						<label htmlFor="ltoh">Price low to high</label>
						<br />
						<input
							type="radio"
							name="sort"
							id="htol"
							value="-1"
							onChange={sortHandler}
						/>
						<label htmlFor="htol">Price high to low</label>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default FilterOptions;

//ID For Cuisine
/*
	1 - North Indian
	2 - South Indian
	3 - Chinese
	4 - Fast Food
	5 - Street Food
*/
