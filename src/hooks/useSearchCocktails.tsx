import { useState } from 'react';
import axios from 'axios';

interface Cocktail {
	idDrink: string;
	strDrink: string;
}

const useSearchCocktails = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<Cocktail[]>([]);
	const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
		null
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
		setTypingTimeout(
			setTimeout(() => {
				searchCocktails(value);
			}, 500)
		);
	};

	const searchCocktails = async (value: string) => {
		try {
			const response = await axios.get(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`
			);
			setSearchResults(response.data.drinks);
		} catch (error) {
			console.error('Error searching cocktails:', error);
		}
	};

	return { searchTerm, searchResults, handleInputChange };
};

export default useSearchCocktails;
