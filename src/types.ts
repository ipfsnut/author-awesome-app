// src/types.ts

export type Book = {
	id: number;
	title: string;
	coverUrl: string;
	authorId: number;
	authorName: string;
	external_resource?: string;
	metadata?: string;
};

export type BooksResponse = {
	books: Book[];
};
