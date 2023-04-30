import { useQuery } from 'react-query';
import { Card, Stack, StackDivider } from '@chakra-ui/react';
import { BookProps } from 'src/components/BookComponent';
import BookComponent from 'src/components/BookComponent';
import { api } from '~/utils/api';

export const DisplayBooks = () => {
	const { data: booksData } = api.books.getAllBooks.useQuery();

	return (
		<Card alignItems='center' bg='greenyellow'>
			<Stack divider={<StackDivider />} spacing='4' bg='cyan'>
				{booksData?.map((book) => (
					<div key={book.id}>
						<BookComponent
							id={book.id}
							title={book.title}
							coverUrl={book.coverUrl}
							authorId={book.authorId}
							AuthorName={book.AuthorName}
						/>
					</div>
				))}
			</Stack>
		</Card>
	);
};
