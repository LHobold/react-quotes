import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import sortQuotes from '../../js/sorting';

const QuoteList = props => {
	const history = useHistory();
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);

	const isSortingAscending = queryParams.get('sort') === 'asc';

	const changeSortingHandler = () => {
		history.push({
			pathname: location.pathname,
			search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
		});
	};

	const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

	return (
		<Fragment>
			<div className={classes.sorting}>
				<button onClick={changeSortingHandler}>
					Sort {isSortingAscending ? 'Descending' : 'Ascending'}
				</button>
			</div>
			<ul className={classes.list}>
				{sortedQuotes.map(quote => (
					<QuoteItem
						key={quote.id}
						id={quote.id}
						author={quote.author}
						text={quote.text}
					/>
				))}
			</ul>
		</Fragment>
	);
};

export default QuoteList;
