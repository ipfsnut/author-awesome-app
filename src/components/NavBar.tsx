// src/components/Navbar.tsx
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

const Navbar = () => {
	const { isSignedIn } = useUser();
	const router = useRouter();

	const handleClick = (path: string) => {
		router.push(path);
	};

	return (
		<Box bg='blue.500' px={4} py={2}>
			<Flex alignItems='center'>
				<Box
					as='span'
					fontWeight='bold'
					color='white'
					_hover={{ textDecoration: 'underline' }}
					cursor='pointer'
					onClick={() => handleClick('/')}
				>
					My Book App
				</Box>
				<Flex marginLeft='auto'>
					<Box
						as='span'
						color='white'
						mx={2}
						_hover={{ textDecoration: 'underline' }}
						cursor='pointer'
						onClick={() => handleClick('/')}
					>
						Home
					</Box>
					{isSignedIn && (
						<>
							<Box
								as='span'
								color='white'
								mx={2}
								_hover={{ textDecoration: 'underline' }}
								cursor='pointer'
								onClick={() => handleClick('/my-books')}
							>
								My Books
							</Box>
							<Box
								as='span'
								color='white'
								mx={2}
								_hover={{ textDecoration: 'underline' }}
								cursor='pointer'
								onClick={() => handleClick('/profile')}
							>
								Profile
							</Box>
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;
