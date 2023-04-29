import styles from './index.module.css';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SignIn, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { SetStateAction, useEffect, useState } from 'react';

import { api } from '~/utils/api';

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
			<main className='flex min-h-screen flex-col items-center justify-center'>
				<div>
					{!user.isSignedIn && <SignInButton />}
					{!!user.isSignedIn && <SignOutButton />}
				</div>
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
