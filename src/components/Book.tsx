import React from 'react';
import {
	Box,
	Image,
	Flex,
	Heading,
	Text,
	Spacer,
	Button,
	VStack,
} from '@chakra-ui/react';

export type BookProps = {
	id: string;
	title: string;
	author: {
		id: string;
		firstName: string;
		lastName: string;
	};
	imageUrl: string;
	description: string;
};

const Book = ({ id, title, author, imageUrl, description }: BookProps) => {
	const authorName = `${author.firstName} ${author.lastName}`;

	return (
		<Box
			maxW='sm'
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			boxShadow='lg'
		>
			<Image src={imageUrl} alt={`${title} book cover`} />

			<VStack p='6' spacing='4' alignItems='flex-start'>
				<Flex>
					<Heading size='md'>{title}</Heading>
					<Spacer />
					<Button colorScheme='blue' size='sm'>
						Add to Library
					</Button>
				</Flex>

				<Text fontWeight='bold'>{authorName}</Text>
				<Text fontSize='sm' noOfLines={4}>
					{description}
				</Text>
			</VStack>
		</Box>
	);
};

export default Book;
