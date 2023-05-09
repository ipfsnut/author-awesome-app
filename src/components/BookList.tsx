import { Button, Box, Image } from '@chakra-ui/react';
import { Book } from '@prisma/client';

type Props = {
	books: Book[];
	onBookSelect: (book: Book) => void;
};

const BookList: React.FC<Props> = ({ books, onBookSelect }) => {
	return (
		<Box>
			<Box as='h2' mb={4}>
				Books
			</Box>
			<Box as='ul'>
				{books.map((book) => (
					<Box as='li' key={book.id} mb={4}>
						<Box>
							{book.title} by {book.AuthorName}
						</Box>
						<Box position='relative' width='100px' height='150px'>
							<Image
								src={book.coverUrl}
								alt={`Cover of ${book.title}`}
								width='100px' // Adjust width to your preference
								height='150px' // Adjust height based on aspect ratio (3:2 in this example)
								objectFit='cover'
							/>
						</Box>
						<Button onClick={() => onBookSelect(book)} variant='outline' mt={2}>
							Read Now
						</Button>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default BookList;
