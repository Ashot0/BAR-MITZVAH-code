import React, { useEffect } from 'react';

import axios from 'axios';

const WikiSearch = async (searchTerm: string): Promise<string> => {
	const convertPhrase = (searchTerm: string): string => {
		return searchTerm
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join('_');
	};
	try {
		const response = await axios.get(
			'https://en.wikipedia.org/api/rest_v1/page/summary/' +
				convertPhrase(searchTerm)
		);
		return response.data.extract;
	} catch (error) {
		return 'No description';
	}
};

export default WikiSearch;
// function WikiSearch() {
