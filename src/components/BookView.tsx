// src/components/BookView.tsx
import React from 'react';
import { Book } from '@prisma/client';
import { Box } from '@chakra-ui/react';

type BookViewProps = {
	book: Book;
};

const BookView: React.FC<BookViewProps> = ({ book }) => {
	if (!book) {
		return <div>Loading...</div>;
	}

	return (
		<Box>
			<h1>{book.title}</h1>
			<img src={book.coverUrl} alt={book.title} height={300} width={200} />
			<p>Author: {book.AuthorName}</p>
			<p>Cover: {book.coverUrl}</p>
			{/* Add more fields as needed */}
			<div>
				<h2>Book Content:</h2>
				<iframe
					src={book.external_resource || ''}
					style={{ width: '100%', height: '500px', border: 'none' }}
					title={book.title}
				></iframe>
			</div>
		</Box>
	);
};

export default BookView;
