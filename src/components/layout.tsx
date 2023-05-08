import type { PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';

export const PageLayout = (props: PropsWithChildren) => {
	return (
		<Box maxW='1200' mx='400' p={4} bg='lightgreen'>
			{props.children}
		</Box>
	);
};

export default PageLayout;
