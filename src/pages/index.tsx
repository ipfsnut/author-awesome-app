import styles from './index.module.css';
import { NextPage } from 'next';
import Head from 'next/head';
import { SignIn, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
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
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import Image from 'next/image';

import { api } from '~/utils/api';

const CreatePostWizard = () => {
	const { user } = useUser();
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
							<Heading>testing card functionality</Heading>
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
					</Card>
				</Container>
			</main>
		</>
	);
};
export default Home;
