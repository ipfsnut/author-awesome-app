import React from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	useToast,
	Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { BookProps } from './BookComponent';
import { createBook } from '../utils/api';

interface AddBookFormProps {
	onBookAdded?: (book: BookProps) => void;
}

type BookFormInputs = Omit<BookProps, 'id'>;

const AddBookForm: React.FC<AddBookFormProps> = ({ onBookAdded }) => {
	const { register, handleSubmit, reset } = useForm<BookFormInputs>();
	const queryClient = useQueryClient();
	const toast = useToast();

	const createBookMutation = useMutation(createBook, {
		onSuccess: (data) => {
			queryClient.invalidateQueries('books');
			toast({
				title: 'Book added!',
				description: `Your book, ${data.title}, has been added to the library.`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			onBookAdded && onBookAdded({ ...data, id: data.id! });
		},
		onError: (error: Error) => {
			toast({
				title: 'Error adding book',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const onSubmit = handleSubmit((data: BookFormInputs) => {
		createBookMutation.mutate(data as any);
		reset();
	});

	return (
		<Box>
			<form onSubmit={onSubmit}>
				<Stack spacing={4}>
					<FormControl>
						<FormLabel htmlFor='title'>Title</FormLabel>
						<Input
							id='title'
							placeholder='Enter book title'
							{...register('title', { required: true })}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor='coverUrl'>Cover URL</FormLabel>
						<Input
							id='coverUrl'
							placeholder='Enter cover image URL'
							{...register('coverUrl', { required: true })}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor='authorId'>Author ID</FormLabel>
						<Input
							id='authorId'
							placeholder='Enter author ID'
							{...register('authorId', { required: true })}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor='AuthorName'>Author Name</FormLabel>
						<Input
							id='AuthorName'
							placeholder='Enter author name'
							{...register('AuthorName', { required: true })}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor='external_resource'>External Resource</FormLabel>
						<Input
							id='external_resource'
							placeholder='Enter external resource'
							{...register('external_resource')}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor='metadata'>Metadata</FormLabel>
						<Textarea
							id='metadata'
							placeholder='Enter metadata'
							{...register('metadata')}
						/>
					</FormControl>

					<Button colorScheme='blue' type='submit'>
						Add Book
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default AddBookForm;
