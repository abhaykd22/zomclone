import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/HomePage/Home';
import Filter from './Components/FilterPage/Filter';
import Details from './Components/DetailPage/Details';
import Transaction from './Components/DetailPage/Transaction';

const Router = () => {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route path="/home" component={Home} />
			<Route path="/filter" component={Filter} />
			<Route path="/restaurant" component={Details} />
			<Route path="/transactionStatus" component={Transaction} />
		</BrowserRouter>
	);
};

export default Router;
