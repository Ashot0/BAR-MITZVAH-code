import { useState } from 'react';

interface IUseBottleProps {
	name: string;
}

interface IUseBottleResult {
	imageLink: string;
	descriptionLink: string;
	cocktailsLink: string;
}

const useBottle = (props: IUseBottleProps): IUseBottleResult => {
	const [bigName] = useState(props.name.trim());
	const [smallName] = useState(props.name.toLowerCase().trim());

	const imageLink = `https://www.thecocktaildb.com/images/ingredients/${smallName}-Medium.png`;
	const descriptionLink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${smallName}`;
	const cocktailsLink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${bigName}`;

	return { imageLink, descriptionLink, cocktailsLink };
};

export default useBottle;
