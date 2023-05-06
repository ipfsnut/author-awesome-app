import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBookForm from './AddBookForm';
import BookView from '../components/BookView';

const App: React.FC = () => {
	const bookId = '1'; // replace with actual bookId fetched from database

	return (
		<ChakraProvider>
			<Router>
				<Routes>
					<Route path='/add-book' element={<AddBookForm />} />
					<Route path='/books/:bookId' element={<BookView bookId={bookId} />} />
					{/* Add other routes here */}
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
