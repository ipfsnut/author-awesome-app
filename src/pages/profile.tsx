import React, { useState, useEffect } from 'react';
import fetchAuthorBooks from '../components/fetchAuthorBooks';
import Book, { BookProps } from '../components/Book';

interface ProfileProps {
	authorId: string;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	city: string;
}

const Profile: React.FC<ProfileProps> = ({
	authorId,
	firstName,
	lastName,
	email,
	country,
	city,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [author, setAuthor] = useState<ProfileProps>({
		authorId,
		firstName,
		lastName,
		email,
		country,
		city,
	});
	const [books, setBooks] = useState<BookProps[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const authorBooks = await fetchAuthorBooks(authorId);
			setBooks(authorBooks);
		};

		fetchData();
	}, [authorId]);

	const handleSave = () => {
		// Save changes to the server
		setIsEditing(false);
	};

	return (
		<div className='Profile'>
			<h2>
				{author.firstName} {author.lastName}
			</h2>
			<div className='Profile-details'>
				{isEditing ? (
					<>
						<input
							type='text'
							value={author.firstName}
							onChange={(e) =>
								setAuthor({ ...author, firstName: e.target.value })
							}
						/>
						<input
							type='text'
							value={author.lastName}
							onChange={(e) =>
								setAuthor({ ...author, lastName: e.target.value })
							}
						/>
						<input
							type='text'
							value={author.email}
							onChange={(e) => setAuthor({ ...author, email: e.target.value })}
						/>
						<input
							type='text'
							value={author.country}
							onChange={(e) =>
								setAuthor({ ...author, country: e.target.value })
							}
						/>
						<input
							type='text'
							value={author.city}
							onChange={(e) => setAuthor({ ...author, city: e.target.value })}
						/>
						<button onClick={handleSave}>Save</button>
					</>
				) : (
					<>
						<div>First Name: {author.firstName}</div>
						<div>Last Name: {author.lastName}</div>
						<div>Email: {author.email}</div>
						<div>Country: {author.country}</div>
						<div>City: {author.city}</div>
						<button onClick={() => setIsEditing(true)}>Edit</button>
					</>
				)}
			</div>
			<h2>
				Books by {author.firstName} {author.lastName}
			</h2>
			<div>
				{books.map((book) => (
					<Book key={book.id} {...book} />
				))}
			</div>
		</div>
	);
};

export default Profile;
