import React from 'react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Avatar,
	Button,
	ButtonGroup,
	Flex,
	IconButton,
	Spacer,
	useDisclosure,
	Link,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import { BookProps } from './BookComponent';

interface UserMenuProps {
	avatarUrl?: string;
	onBookAdded?: (book: BookProps) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ avatarUrl, onBookAdded }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement>(null);
	const user: any = useUser();

	// Disclosure for the Add Book modal
	const {
		isOpen: isAddBookModalOpen,
		onOpen: onAddBookModalOpen,
		onClose: onAddBookModalClose,
	} = useDisclosure();

	const handleBookAdded = (book: BookProps) => {
		onBookAdded && onBookAdded(book);
	};

	return (
		<>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label='User Menu'
					icon={
						<Box as='span' fontSize='1.5rem'>
							&#9776;
						</Box>
					}
					onClick={onOpen}
					variant='ghost'
					color='white'
				/>
				<MenuList>
					{/* Add the AddBookForm inside a Modal */}
					<MenuItem onClick={onAddBookModalOpen}>Add Book</MenuItem>
					<Link href='/settings'>
						<MenuItem>Settings</MenuItem>
					</Link>
					<MenuItem onClick={() => user.isSignedIn && user.signOut()}>
						Logout
					</MenuItem>
				</MenuList>
			</Menu>

			{/* AddBookForm in a Modal */}
			<Modal isOpen={isAddBookModalOpen} onClose={onAddBookModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add a New Book</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>
					<ModalFooter>
						<Button onClick={onAddBookModalClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UserMenu;
