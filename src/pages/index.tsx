import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { type NextPage } from 'next';
import BookList from 'src/components/BookList';
import { useQuery } from 'react-query';
import { api } from 'src/utils/api';
import Navbar from 'src/components/NavBar';
import BookView from 'src/components/BookView';

import Image from 'next/image';
import { LoadingPage, LoadingSpinner } from 'src/components/loading';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { PageLayout } from 'src/components/layout';
import { PostView } from 'src/components/postView';
import { Book } from '@prisma/client';
import { CreateBookWizard } from './CreateBookWizard';

import {
	Box,
	VStack,
	HStack,
	Heading,
	Text,
	Avatar,
	Spacer,
	Button,
	Input,
	Skeleton,
} from '@chakra-ui/react';

type Props = {
	books: Book[];
};

type SelectedBook = {
	book: Book;
	index: number;
};

const CreatePostWizard = () => {
	const { user } = useUser();

	const [input, setInput] = useState('');

	const ctx = api.useContext();

	const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
		onSuccess: () => {
			setInput('');
			void ctx.posts.getAll.invalidate();
		},
		onError: (e) => {
			const errorMessage = e.data?.zodError?.fieldErrors.content;
			if (errorMessage && errorMessage[0]) {
				toast.error(errorMessage[0]);
			} else {
				toast.error('Failed to post! Please try again later.');
			}
		},
	});

	if (!user) return null;

	return (
		<div className='flex w-full gap-3'>
			<UserButton
				appearance={{
					elements: {
						userButtonAvatarBox: {
							width: 50,
							height: 50,
						},
					},
				}}
			/>
			<input
				placeholder='Type some emojis!'
				className='grow bg-transparent outline-none'
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						if (input !== '') {
							mutate({ content: input });
						}
					}
				}}
				disabled={isPosting}
			/>
			{input !== '' && !isPosting && (
				<button onClick={() => mutate({ content: input })}>Post</button>
			)}
			{isPosting && (
				<div className='flex items-center justify-center'>
					<LoadingSpinner size={20} />
				</div>
			)}
		</div>
	);
};

const Feed = () => {
	const { data, error, isLoading: postsLoading } = api.posts.getAll.useQuery();
	if (error) {
		console.error('Error fetching books on client:', error); // Add this line to log the error on the client side
	}
	if (postsLoading)
		return (
			<div className='flex grow'>
				<LoadingPage />
			</div>
		);

	if (!data) return <div>Something went wrong</div>;

	return (
		<VStack spacing={4} alignItems='stretch' w='100%'>
			{data.map((fullPost) => (
				<Box
					key={fullPost.post.id}
					borderRadius='md'
					borderWidth='1px'
					borderColor='green.200' // Add a light green border color
					p={4}
					boxShadow='md'
				>
					<HStack>
						<div>
							<Avatar src={fullPost.author.profileImageUrl} />
						</div>
						<Box>
							<Heading size='sm'>{fullPost.author.username}</Heading>
							<Text fontSize='sm'>{fullPost.author.username}</Text>
						</Box>
					</HStack>
					<Text mt={2}>{fullPost.post.content}</Text>
				</Box>
			))}
		</VStack>
	);
};

const Home: NextPage = () => {
	const { isLoaded: userLoaded, isSignedIn } = useUser();

	// Start fetching asap
	api.books.getAll.useQuery();

	// Fetch the list of books
	const { data: books, isLoading } = api.books.getAll.useQuery();
	const [selectedBook, setSelectedBook] = useState<SelectedBook | null>(null);
	const handleBookSelect = (book: Book, index: number) => {
		setSelectedBook({ book, index });
	};

	const [showAddBookForm, setShowAddBookForm] = useState(false);
	// Return empty div if user isn't loaded
	//if (!userLoaded || isLoading) return <LoadingPage />;

	if (!books) return <div>No books found</div>;
	// Return empty div if user isn't loaded

	return (
		<PageLayout>
			<Navbar />
			<div className='flex border-b border-slate-400 p-4'>
				{!isSignedIn && (
					<div className='flex justify-center'>
						<SignInButton />
					</div>
				)}
				<HStack spacing={8} py={4}>
					{isSignedIn && <CreatePostWizard />}
				</HStack>
			</div>
			<BookList
				books={books}
				onBookSelect={(book, index) => handleBookSelect(book, index)}
			/>

			<Button onClick={() => setShowAddBookForm(!showAddBookForm)}>
				{showAddBookForm ? 'Hide Add Book Form' : 'Add Book'}
			</Button>
			{showAddBookForm && (
				<CreateBookWizard
					onCreate={function (book: Book): void {
						throw new Error('Function not implemented.');
					}}
				/>
			)}
			<Feed />

			<Feed />
			<div className='flex items-center justify-between p-4 text-xl'>
				<a href='https://github.com/ipfsnut/author-awesome-app/blob/701cdf9e604333693a0775b1c58550c5718e6f5c/README.md'>
					<div className='flex items-center justify-center gap-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='white'
						>
							<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
						</svg>
						<div>Github</div>
					</div>
				</a>
			</div>
		</PageLayout>
	);
};

export default Home;
