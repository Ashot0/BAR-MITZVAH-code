import { useState, useEffect } from 'react';
import axios from 'axios';

const useBookCategory = <T,>(url: string, variable: string): T[] | null => {
	const [data, setData] = useState<T[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(url);
				const sortedArray = response.data.drinks.sort((a: T, b: T) => {
					switch (variable) {
						case 'category':
							// @ts-ignore
							a.strCategory.localeCompare(b.strCategory);
							break;
						case 'glass':
							// @ts-ignore
							a.strGlass.localeCompare(b.strGlass);
							break;
						case 'ingridient':
							// @ts-ignore
							a.strIngredient1.localeCompare(b.strIngredient1);
							break;
						case 'alcoholic':
							// @ts-ignore
							a.strAlcoholic.localeCompare(b.strAlcoholic);
							break;
						default:
							break;
					}
				});
				setData(sortedArray);
			} catch (error) {
				console.error(`Error fetching ${url}:`, error);
			}
		};

		fetchData();
	}, [url]);

	return data;
};

export default useBookCategory;
