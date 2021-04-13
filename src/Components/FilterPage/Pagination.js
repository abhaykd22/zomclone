import React, { Component } from 'react';

class Pagination extends Component {
	render() {
		const { pageHandler, pageCount, pageArrowHandler } = this.props;
		let pageArray = [];
		for (let i = 1; i <= pageCount; i++) {
			pageArray.push(i);
		}
		return (
			<React.Fragment>
				<footer className="pagination">
					<div>
						<ul>
							<li className="foot">
								<button
									className="nav-2-item-arrow"
									onMouseUp={pageArrowHandler}
								>
									{'<'}
								</button>
							</li>
							{pageArray.map((page) => (
								<li key={page} className="foot">
									<div
										value={page}
										onMouseUp={pageHandler}
										className="nav-2-item"
									>
										{page}
									</div>
								</li>
							))}
							<li className="foot">
								<button
									className="nav-2-item-arrow"
									onMouseUp={pageArrowHandler}
								>
									{'>'}
								</button>
							</li>
						</ul>
					</div>
				</footer>
			</React.Fragment>
		);
	}
}

export default Pagination;
