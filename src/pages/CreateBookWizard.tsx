import { UserButton, useUser } from '@clerk/nextjs';
import { api } from 'src/utils/api';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Book } from '@prisma/client';
import { Button, Input } from '@chakra-ui/react';

type Props = {
	onCreate: (book: Book) => void;
};

export const CreateBookWizard = ({ onCreate }: Props) => {
	const { user } = useUser();
	const [title, setTitle] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [externalResource, setExternalResource] = useState<string | null>(null);
	const [metadata, setMetadata] = useState<string | null>(null);

	const ctx = api.useContext();

	const { mutate, isLoading: isCreating } = api.books.add.useMutation({
		onSuccess: (book: Book) => {
			setTitle('');
			setAuthorName('');
			setCoverUrl('');
			setExternalResource(null);
			setMetadata(null);
			onCreate(book);
		},
		onError: (e) => {
			const errorMessage = e.data?.zodError?.fieldErrors;
			if (errorMessage && errorMessage.title) {
				toast.error(errorMessage.title[0]);
			} else {
				toast.error('Failed to create book! Please try again later.');
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
							width: 56,
							height: 56,
						},
					},
				}}
			/>
			<Input
				placeholder='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Input
				placeholder='Author Name'
				value={authorName}
				onChange={(e) => setAuthorName(e.target.value)}
			/>
			<Input
				placeholder='Cover URL'
				value={coverUrl}
				onChange={(e) => setCoverUrl(e.target.value)}
			/>
			<Input
				placeholder='External Resource URL (optional)'
				value={externalResource || ''}
				onChange={(e) => setExternalResource(e.target.value)}
			/>
			<Input
				placeholder='Metadata (optional)'
				value={metadata || ''}
				onChange={(e) => setMetadata(e.target.value)}
			/>
			<Button
				onClick={() =>
					mutate({
						title,
						AuthorName: authorName,
						coverUrl,
						external_resource: externalResource,
						metadata: metadata,
					})
				}
				disabled={
					isCreating ||
					!title ||
					!authorName ||
					!coverUrl ||
					title.length > 255 ||
					authorName.length > 255 ||
					coverUrl.length > 255
				}
			>
				{isCreating ? 'Creating...' : 'Create Book'}
			</Button>
		</div>
	);
};
