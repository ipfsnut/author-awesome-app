import React from 'react';
import {
	Box,
	VStack,
	FormControl,
	FormLabel,
	Heading,
	Switch,
	useColorMode,
} from '@chakra-ui/react';
import { UserProfile } from '@clerk/nextjs';
import Head from 'next/head';

const Settings = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Head>
				<title>Settings - Author Awesome App</title>
			</Head>
			<VStack spacing={4} padding={4}>
				<Heading>Settings</Heading>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='theme-switch' mb='0'>
						Dark mode
					</FormLabel>
					<Switch
						id='theme-switch'
						isChecked={colorMode === 'dark'}
						onChange={toggleColorMode}
					/>
				</FormControl>
				<Box>
					<Heading size='md' mb={2}>
						Update Profile
					</Heading>
					<UserProfile />
				</Box>
			</VStack>
		</>
	);
};

export default Settings;
