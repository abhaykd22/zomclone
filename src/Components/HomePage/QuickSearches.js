import React from 'react';
import QuickSearchItem from './QuickSearchItem';

class QuickSearches extends React.Component {
	render() {
		const { mealtypes } = this.props;
		return (
			<React.Fragment>
				<main id="home-content" className="my-container">
					<div className="quick-search-content">
						<h1>Quick Searches</h1>
						<p>Discover restaurants by type of meal</p>
					</div>
					{/* <div > */}
					<div className="qs-options">
						{mealtypes.map((meal) => {
							return (
								<QuickSearchItem
									key={meal._id}
									id={meal._id}
									mealtype={meal}
								/>
							);
						})}
					</div>
					{/* </div> */}
				</main>
			</React.Fragment>
		);
	}
}

export default QuickSearches;
