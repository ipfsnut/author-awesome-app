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
	id: number;
	title: string;
	coverUrl: string;
	authorId: number;
	AuthorName: string;
	external_resource: string | null;
};

const BookComponent = ({ title, coverUrl, AuthorName }: BookProps) => {
	return (
		<Box
			maxW='sm'
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			boxShadow='lg'
		>
			<Image src={coverUrl} alt={`${title} book cover`} />

			<VStack p='6' spacing='4' alignItems='flex-start'>
				<Flex>
					<Heading size='md'>{title}</Heading>
					<Spacer />
					<Button colorScheme='blue' size='sm'>
						Add to Library
					</Button>
				</Flex>

				<Text fontWeight='bold'>{AuthorName}</Text>
			</VStack>
		</Box>
	);
};

export default BookComponent;
