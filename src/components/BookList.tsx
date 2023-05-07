import { Book } from '@prisma/client';

type Props = {
	books: Book[];
};

const BookList: React.FC<Props> = ({ books }) => {
	return (
		<div>
			<h2>Books</h2>
			<ul>
				{books.map((book) => (
					<li key={book.id}>
						{book.title} by {book.AuthorName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default BookList;
