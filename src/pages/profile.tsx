import React, { useState } from 'react';

interface ProfileProps {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	city: string;
}

const Profile: React.FC<ProfileProps> = (author) => {
	const [isEditing, setIsEditing] = useState(false);
	const [firstName, setFirstName] = useState(author.firstName);
	const [lastName, setLastName] = useState(author.lastName);
	const [email, setEmail] = useState(author.email);
	const [country, setCountry] = useState(author.country);
	const [city, setCity] = useState(author.city);

	const handleSave = () => {
		// Save changes to the server
		setIsEditing(false);
	};

	return (
		<div className='Profile'>
			<h2>
				{firstName} {lastName}
			</h2>
			<div className='Profile-details'>
				{isEditing ? (
					<>
						<input
							type='text'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<input
							type='text'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						<input
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='text'
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
						<input
							type='text'
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<button onClick={handleSave}>Save</button>
					</>
				) : (
					<>
						<div>First Name: {firstName}</div>
						<div>Last Name: {lastName}</div>
						<div>Email: {email}</div>
						<div>Country: {country}</div>
						<div>City: {city}</div>
						<button onClick={() => setIsEditing(true)}>Edit</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
