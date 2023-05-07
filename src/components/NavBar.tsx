// src/components/Navbar.tsx
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = () => {
	const { isSignedIn } = useUser();
	const router = useRouter();

	return (
		<Box bg='blue.500' px={4} py={2}>
			<Flex alignItems='center'>
				<Link href='/' passHref>
					<ChakraLink fontWeight='bold' color='white'>
						My Book App
					</ChakraLink>
				</Link>
				<Flex marginLeft='auto'>
					<Link href='/' passHref>
						<ChakraLink color='white' mx={2}>
							Home
						</ChakraLink>
					</Link>
					{isSignedIn && (
						<>
							<Link href='/my-books' passHref>
								<ChakraLink color='white' mx={2}>
									My Books
								</ChakraLink>
							</Link>
							<Link href='/profile' passHref>
								<ChakraLink color='white' mx={2}>
									Profile
								</ChakraLink>
							</Link>
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;
