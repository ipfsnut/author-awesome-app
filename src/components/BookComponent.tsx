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
	metadata: string | null;
	createdAt: Date | string;
};

interface BookComponentProps extends BookProps {
	onReadNowClick?: () => void;
}

export const BookComponent: React.FC<BookComponentProps> = ({
	title,
	coverUrl,
	AuthorName,
	external_resource,
	onReadNowClick,
	createdAt,
}) => {
	const handleReadNowClick = () => {
		if (external_resource) {
			window.open(external_resource, '_blank');
		}

		onReadNowClick && onReadNowClick();
	};

	return (
		<Box
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			boxShadow='lg'
			backgroundColor='white'
			width='250px'
		>
			<Image
				src={coverUrl}
				alt={`${title} book cover`}
				height='350px'
				objectFit='cover'
			/>

			<VStack p='4' spacing='2' alignItems='flex-start'>
				<Heading size='md' fontWeight='medium' isTruncated>
					{title}
				</Heading>

				<Text fontSize='sm' fontWeight='semibold'>
					{AuthorName}
				</Text>

				<Text fontSize='xs' color='gray.500'>
					Published: {new Date(createdAt).toLocaleDateString()}
				</Text>

				<Spacer />

				<Button
					colorScheme='blue'
					size='sm'
					onClick={handleReadNowClick}
					width='100%'
				>
					Read Now
				</Button>
			</VStack>
		</Box>
	);
};

export default BookComponent;
