import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from '../comments/CommentsList';

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false);

	const params = useParams();
	const { quoteId } = params;

	const {
		sendRequest,
		status,
		data: loadedComments,
		error,
	} = useHttp(getAllComments);

	useEffect(() => {
		sendRequest(quoteId);
	}, [quoteId, sendRequest]);

	const addedCommentHandler = useCallback(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};

	let comments;
	if (status === 'pending') {
		comments = (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (status === 'completed') {
		comments = (
			<div className="centered">
				<CommentsList comments={loadedComments} />
			</div>
		);
	}

	if (
		status === 'completed' &&
		(!loadedComments || loadedComments.length === 0)
	) {
		comments = (
			<div className="centered focused">
				<p className={classes.error}>No comments yet.</p>
			</div>
		);
	}

	if (error) {
		comments = (
			<div className="centered">
				<p className={classes.error}>{error}</p>
			</div>
		);
	}

	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && (
				<NewCommentForm
					quoteId={params.quoteId}
					onAddedComment={addedCommentHandler}
				/>
			)}
			{comments}
		</section>
	);
};

export default Comments;
