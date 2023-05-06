import React from 'react';
import { BookProps } from './BookComponent';
import BookComponent from './BookComponent';
import { Card, Stack, StackDivider, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface DisplayBooksProps {
	books: BookProps[];
	onDelete?: (book: BookProps) => void;
}

export const BookModule: React.FC<DisplayBooksProps> = ({
	books,
	onDelete,
}) => {
	const handleDelete = (book: BookProps) => {
		onDelete && onDelete(book);
	};

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
							metadata={book.metadata}
							createdAt={book.createdAt}
						/>
						{onDelete && (
							<IconButton
								aria-label='Delete book'
								icon={<CloseIcon />}
								onClick={() => handleDelete(book)}
								size='xs'
								variant='ghost'
								colorScheme='red'
							/>
						)}
					</div>
				))}
			</Stack>
		</Card>
	);
};
