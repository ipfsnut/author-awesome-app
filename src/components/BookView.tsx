import React from 'react';
import { Book } from 'src/types';

type BookViewProps = {
	book: Book;
};

const BookView: React.FC<BookViewProps> = ({ book }) => {
	if (!book) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{book.title}</h1>
			<img src={book.coverUrl} alt={book.title} />
			<p>Author: {book.authorName}</p>
			<p>Cover: {book.coverUrl}</p>
			<p>External Resource: {book.external_resource} </p>
			{/* Add more fields as needed */}
		</div>
	);
};

export default BookView;
