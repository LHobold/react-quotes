import { Redirect, Route, Switch } from 'react-router';
import React, { Suspense } from 'react';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const LazyFallBack = () => {
	return (
		<div className="centered">
			<LoadingSpinner />
		</div>
	);
};

function App() {
	return (
		<Layout>
			<Suspense fallback={<LazyFallBack />}>
				<Switch>
					<Route path="/" component={() => <Redirect to="/quotes" />} exact />
					<Route path="/new-quote" component={NewQuote} exact />
					<Route path="/quotes" component={AllQuotes} exact />
					<Route path="/quotes/:quoteId" component={QuoteDetail} />
					<Route to="*" component={NotFound} />
				</Switch>
			</Suspense>
		</Layout>
	);
}

export default App;
