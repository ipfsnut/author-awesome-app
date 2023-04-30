import styles from './index.module.css';
import { NextPage } from 'next';
import Head from 'next/head';
import {
	SignIn,
	SignInButton,
	SignOutButton,
	UserProfile,
	useUser,
} from '@clerk/nextjs';
import { SetStateAction, useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Container,
	Heading,
	Wrap,
	WrapItem,
	Flex,
	Center,
	Stack,
	StackDivider,
	Box,
} from '@chakra-ui/react';
import AddBookForm from 'src/components/AddBookForm';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import Image from 'next/image';

import { api } from '~/utils/api';
import { BookProps } from 'src/components/BookComponent';
import BookComponent from 'src/components/BookComponent';

const CreatePostWizard = () => {
	const { user } = useUser();
	console.log(user);
	if (!user) return null;
	return (
		<Avatar bg='fuchsia'>
			<Image
				src={user.profileImageUrl}
				alt='Profile image'
				width={50}
				height={50}
			/>
		</Avatar>
	);
};

const DisplayBooks = ({ books }: { books: BookProps[] }) => {
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
						/>
					</div>
				))}
			</Stack>
		</Card>
	);
};

type Post = {
	id: string;
	content: string;
	authorId: string;
	// add other properties of the post as needed
};

type Author = {
	id: string;
	username: string;
	profileImageUrl: string;
};

type PostWithUser = {
	post: Post;
	author: {
		id: string;
		username: string | null;
		profileImageUrl: string;
	};
};

const PostView = (props: PostWithUser) => {
	const { post, author } = props;
	return (
		<Flex color='blue'>
			<Center w='100px' bg='green.500'>
				<span>${author.username}</span>
			</Center>
			<span>{post.content}</span>
		</Flex>
	);
};

const Home: NextPage = () => {
	const hello = api.example.hello.useQuery({ text: 'from tRPC' });
	const user = useUser();
	const [booksData, setBooksData] = useState<BookProps[]>([]);
	const [profile, setProfile] = useState(null);
	console.log(hello.data);

	const { data } = api.example.getAll.useQuery();

	return (
		<>
			<Head>
				<title>Wohoo</title>
				<meta name='description' content='meh' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<div>
					<Avatar bg='fuchsia'></Avatar>

					{!user.isSignedIn && (
						<div className='flex justify-center'>
							<SignInButton />
						</div>
					)}
					{!!user.isSignedIn && <CreatePostWizard />}
				</div>
				<Container
					minWidth='max-content'
					alignItems='center'
					gap='20'
					bg='floralwhite'
				>
					<Card bg='fuchsia'>
						<CardBody bg='tomato' gap='7'>
							<Heading>Work in Progress</Heading>
							This is outside the heading, beneath it
						</CardBody>
						beyond that, the card body ends.
					</Card>
					<Card alignItems='center' bg='brown' gap='15'>
						<CardHeader bg='yellowgreen'>
							<Heading size='md' gap='10'>
								Definitely Not Your Typical Client Report
							</Heading>
						</CardHeader>
						<CardBody alignItems='center' bg='greenyellow'>
							<Stack divider={<StackDivider />} spacing='4' bg='cyan'>
								{data?.map((post) => (
									<div key={post.id}>{post.content}</div>
								))}
							</Stack>
						</CardBody>
						<CardFooter>
							<a
								href='https://github.com/ipfsnut/author-awesome-app'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://github.com/ipfsnut/author-awesome-app
							</a>
						</CardFooter>
					</Card>
					<AddBookForm />
				</Container>
				<Container
					minWidth='max-content'
					alignItems='center'
					gap='20'
					bg='floralwhite'
				>
					<Card bg='fuchsia'>
						<CardBody bg='tomato' gap='7'>
							<Heading>Title</Heading>
						</CardBody>
						beyond that, the card body ends.
					</Card>
					<Card alignItems='center' bg='brown' gap='15'>
						<CardBody alignItems='center' bg='greenyellow'>
							<Stack divider={<StackDivider />} spacing='4' bg='cyan'>
								{data?.map((book) => (
									<div key={book.id}>{book.authorId}</div>
								))}
							</Stack>
						</CardBody>
						<CardFooter>
							<a
								href='https://github.com/ipfsnut/author-awesome-app'
								target='_blank'
								rel='noopener noreferrer'
							>
								https://github.com/ipfsnut/author-awesome-app
							</a>
						</CardFooter>
					</Card>
				</Container>
				<DisplayBooks books={booksData} />
			</main>
		</>
	);
};
export default Home;
