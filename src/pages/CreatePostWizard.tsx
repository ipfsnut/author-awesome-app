import { useUser } from '@clerk/nextjs';
import { Avatar } from '@chakra-ui/react';
import Image from 'next/image';

export const CreatePostWizard = () => {
	const { user } = useUser();
	console.log(user);
	if (!user) return null;
	return (
		<Avatar bg='fuchsia'>
			<Image
				src={user.profileImageUrl}
				alt='Profile image'
				width={50}
				height={50}
			/>
		</Avatar>
	);
};
export default CreatePostWizard;
