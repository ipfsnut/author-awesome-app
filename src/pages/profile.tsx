import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import fetchAuthorBooksFromAPI from 'src/components/fetchAuthorBooksFromAPI';
import { BookProps } from 'src/components/BookComponent';

type Props = {
	authorName: string;
	books: BookProps[];
};

export default function Profile({ authorName, books }: Props) {
	const router = useRouter();

	console.log(router.query);

	const [query, setQuery] = useState<string>('');

	const { data: filteredBooks, isLoading } = useQuery(
		['filteredBooks', query],
		() => {
			return fetchAuthorBooksFromAPI(router.query.id as string).then((data) => {
				return data.filter((book) => {
					return book.title.toLowerCase().includes(query.toLowerCase());
				});
			});
		}
	);

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

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
							{filteredBooks.map((book) => (
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
		`http://localhost:3000/api/books?authorId=${params.id}`
	);
	const books = await res.json();
	const authorName = books.length > 0 ? books[0].AuthorName : 'Unknown Author';

	return {
		props: {
			authorName,
			books,
		},
		revalidate: 60,
	};
}
