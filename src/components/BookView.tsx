// src/components/BookView.tsx
import React from 'react';
import { Book } from '@prisma/client';

type BookViewProps = {
	book: Book;
};

export const BookView: React.FC<BookViewProps> = ({ book }) => {
	return (
		<div>
			<h1>{book.title}</h1>
			<img src={book.coverUrl} alt={book.title} />
			<p>Author: {book.AuthorName}</p>
			{/* Add more fields as needed */}
		</div>
	);
};
