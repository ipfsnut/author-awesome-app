import React from 'react';
import { BookProps } from './BookComponent';
import BookComponent from './BookComponent';
import { Card, Stack, StackDivider } from '@chakra-ui/react';

interface DisplayBooksProps {
	books: BookProps[];
}

export const DisplayBooks: React.FC<DisplayBooksProps> = ({ books }) => {
	return (
		<Card alignItems='center' bg='greenyellow'>
			<Stack divider={<StackDivider />} spacing='4' bg='cyan'>
				{books?.map((book) => (
					<div key={book.id}>
						<BookComponent
							id={book.id}
							title={book.title}
							coverUrl={book.coverUrl}
							authorId={book.authorId}
							AuthorName={book.AuthorName}
							external_resource={book.external_resource}
						/>
					</div>
				))}
			</Stack>
		</Card>
	);
};
