import React, { useState } from 'react';
import { Box, Input, VStack, Button } from '@chakra-ui/react';

const AddBookForm = () => {
	const [title, setTitle] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [AuthorName, setAuthorName] = useState('');

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		// Save the new book data to your database or API
		// and update your application state here.

		// Clear the form fields after submission.
		setTitle('');
		setCoverUrl('');
		setAuthorName('');
	};

	return (
		<Box as='form' onSubmit={handleSubmit}>
			<VStack spacing={4}>
				<Input
					placeholder='Title'
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Input
					placeholder='Cover URL'
					value={coverUrl}
					onChange={(event) => setCoverUrl(event.target.value)}
				/>
				<Input
					placeholder='Author Name'
					value={AuthorName}
					onChange={(event) => setAuthorName(event.target.value)}
				/>
				<Button type='submit' colorScheme='blue'>
					Add Book
				</Button>
			</VStack>
		</Box>
	);
};

export default AddBookForm;
