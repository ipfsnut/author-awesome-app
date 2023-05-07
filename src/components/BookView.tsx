// src/components/BookView.tsx
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
			{/* Add more fields as needed */}
			<div>
				<h2>Book Content:</h2>
				<iframe
					src={book.external_resource}
					style={{ width: '100%', height: '500px', border: 'none' }}
					title={book.title}
				></iframe>
			</div>
		</div>
	);
};

export default BookView;
