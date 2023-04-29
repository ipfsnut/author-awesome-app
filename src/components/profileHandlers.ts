import { Post } from '.prisma/client';

export const updatePost = async (post: Post) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/post/${post.id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(post),
		}
	);

	if (!response.ok) {
		throw new Error('Failed to update post');
	}

	const updatedPost = await response.json();

	return updatedPost;
};

export const deletePost = async (id: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
		{
			method: 'DELETE',
		}
	);

	if (!response.ok) {
		throw new Error('Failed to delete post');
	}

	return true;
};
