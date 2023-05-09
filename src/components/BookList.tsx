import {
	Box,
	VStack,
	HStack,
	Image,
	Text,
	Button,
	Spacer,
	Center,
} from '@chakra-ui/react';
import { Book } from '@prisma/client';
import { useState } from 'react';
import BookView from './BookView';
import React from 'react';

type Props = {
	books: Book[];
	onBookSelect: (book: Book, index: number) => void;
};
const BookList: React.FC<Props> = ({ books, onBookSelect }) => {
	const [selectedBook, setSelectedBook] = useState<{
		book: Book | null;
		index: number | null;
	}>({ book: null, index: null });

	const handleBookSelect = (book: Book, index: number) => {
		setSelectedBook({ book, index });
	};
	return (
		<VStack spacing={4} alignItems='stretch' w='100%'>
			{books.map((book, index) => (
				<React.Fragment key={book.id}>
					<Box
						borderWidth='1px'
						borderRadius='lg'
						p={4}
						boxShadow='md'
						_hover={{ boxShadow: 'xl' }}
					>
						<HStack spacing={4}>
							<Center boxSize='100px'>
								<Image
									src={book.coverUrl}
									alt={`Cover of ${book.title}`}
									objectFit='contain'
									borderRadius='md'
									boxSize='100%'
									w='100%'
									h='100%'
								/>
							</Center>
							<VStack alignItems='start' flexGrow={1}>
								<Text fontWeight='bold' fontSize='lg'>
									{book.title}
								</Text>
								<Text fontSize='sm'>by {book.AuthorName}</Text>
							</VStack>
							<Spacer />
							<Button
								onClick={() => handleBookSelect(book, index)}
								variant='outline'
								mt={2}
							>
								Read Now
							</Button>
							{selectedBook.book && selectedBook.index === index && (
								<BookView book={selectedBook.book} />
							)}
						</HStack>
					</Box>
				</React.Fragment>
			))}
		</VStack>
	);
};

export default BookList;
