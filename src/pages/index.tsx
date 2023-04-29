import styles from './index.module.css';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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

import { api } from '~/utils/api';

const CreatePostWizard = () => {
	const { user } = useUser();
	if (!user) return null;
	return (
		<div>
			<img src={user.profileImageUrl} alt='Profile image' />
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
				<title>Create T3 App</title>
				<meta name='description' content='meh' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='flex min-h-screen flex-col items-center justify-center bg-ffffff '>
				<div>
					<Wrap>
						<WrapItem>
							<Avatar
								name='epicdylan'
								src='https://twitter.com/thomasdylandan2/photo'
							/>
						</WrapItem>
					</Wrap>
					{!user.isSignedIn && <SignInButton />}
					{!!user.isSignedIn && <SignOutButton />}
				</div>
				<Card>
					<CardBody>
						<Heading>
							View a summary of all your customers over the last month.
						</Heading>
					</CardBody>
				</Card>
				<div>
					{data?.map((post, author) => (
						<div key={post.id}>
							{post.content}
							{post.content}
						</div>
					))}
				</div>
			</main>
		</>
	);
};
export default Home;
