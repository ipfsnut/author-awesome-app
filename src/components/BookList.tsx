import { Button } from '@chakra-ui/react';
import { Book } from '@prisma/client';

type Props = {
	books: Book[];
	onBookSelect: (book: Book) => void;
};

const BookList: React.FC<Props> = ({ books, onBookSelect }) => {
	return (
		<div>
			<h2>Books</h2>
			<ul>
				{books.map((book) => (
					<li key={book.id}>
						{book.title} by {book.AuthorName}
						<Button onClick={() => onBookSelect(book)} variant='outline'>
							Read Now
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default BookList;
