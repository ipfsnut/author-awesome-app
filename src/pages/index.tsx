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
	Heading,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import Image from 'next/image';

import { api } from '~/utils/api';

const CreatePostWizard = () => {
	const { user } = useUser();
	if (!user) return null;
	return (
		<Avatar>
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
		<div>
			<div>
				<span>${author.username}</span>
			</div>
			<span>{post.content}</span>
		</div>
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
				<Card bg='fuchsia'>
					<CardBody bg='tomato'>
						<Heading>testing card functionality</Heading>
						This is outside the heading, beneath it
					</CardBody>
					beyond that, the card body ends.
				</Card>
				<div>
					{data?.map((post) => (
						<div key={post.id}>{post.content}</div>
					))}
				</div>
			</main>
		</>
	);
};
export default Home;
