import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BookProps } from 'src/components/BookComponent';
import { useUser } from '@clerk/clerk-react';

type Props = {
	authorId: string;
	authorName: string;
	books: BookProps[];
};

export default function Profile({ authorId, authorName, books }: Props) {
	const router = useRouter();

	console.log(router.query);

	const [query, setQuery] = useState<string>('');

	const { user } = useUser();
	const isAdmin = user?.publicMetadata?.isAdmin;

	const { data: allBooks, isLoading } = useQuery('allBooks', async () => {
		const res = await fetch('/api/books');
		return res.json();
	});

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const filteredBooks = allBooks?.filter((book: any) => {
		return (
			book.AuthorName.toLowerCase().includes(authorName.toLowerCase()) &&
			book.title.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<div>
			<Head>
				<title>{authorName} - Profile</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<h1 className='title'>{authorName}</h1>
				<p>Search for a book:</p>
				<input type='text' onChange={(e) => setQuery(e.target.value)} />
				{isLoading && <div>Loading...</div>}
				{filteredBooks && (
					<div>
						<h2>Books:</h2>
						<ul>
							{filteredBooks.map((book: any) => (
								<li key={book.id}>
									<Link href={`/books/${book.id}`}>
										<a>
											{book.title} by {authorName}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
				<div>
					<h2>All Books:</h2>
					<ul>
						{books.map((book) => (
							<li key={book.id}>
								<Link href={`/books/${book.id}`}>
									<a>
										{book.title} by {authorName}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</main>
		</div>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const { params } = context;
	if (!params?.id) {
		return {
			notFound: true,
		};
	}
	const res = await fetch(
		`http://localhost:3000/api/authorBooks?authorId=${params.id}`
	);
	const books = await res.json();
	const authorName = books.length > 0 ? books[0].AuthorName : 'Unknown Author';

	return {
		props: {
			authorId: params.id as string,
			authorName,
			books,
		},
		revalidate: 60,
	};
}
