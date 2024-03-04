import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './drink-slide.scss';
import CoctailsPopup from '../cocktailsPopup/CoctailsPopup';
import IngridientPopup from '../ingridientPopup/IngridientPopup';

interface IDrinkSlideProps {
	className?: string;
	strDrink: string;
	strDrinkThumb: string;
	idDrink: string;
}
interface ICoctail {
	idDrink: string;
	strDrink?: string;
	strCategory?: string;
	strAlcoholic?: string;
	strIBA?: string;
	strGlass?: string;
	strInstructions?: string;
	strInstructionsES?: string;
	strInstructionsDE?: string;
	strInstructionsFR?: string;
	strInstructionsIT?: string;
	strIngredient1?: string;
	strIngredient2?: string;
	strIngredient3?: string;
	strIngredient4?: string;
	strIngredient5?: null;
	strIngredient6?: null;
	strIngredient7?: null;
	strIngredient8?: null;
	strIngredient9?: null;
	strIngredient10?: null;
	strIngredient11?: null;
	strIngredient12?: null;
	strIngredient13?: null;
	strIngredient14?: null;
	strIngredient15?: null;
	strMeasure1?: string;
	strMeasure2?: string;
	strMeasure3?: string;
	strMeasure4?: string;
	strMeasure5?: string;
	strMeasure6?: string;
	strMeasure7?: string;
	strMeasure8?: string;
	strMeasure9?: string;
	strMeasure10?: string;
	strMeasure11?: string;
	strMeasure12?: string;
	strMeasure13?: string;
	strMeasure14?: string;
	strMeasure15?: string;
}
interface ICoctailsArray extends Array<ICoctail> {}

const DrinkSlide: React.FC<IDrinkSlideProps> = ({
	className = '',
	strDrink,
	strDrinkThumb,
	idDrink,
}) => {
	const [drinkDetails, setDrinkDetails] = useState<ICoctail>();

	const PopupDrinks = async () => {
		const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
		try {
			const response = await axios.get(url);
			const data: ICoctailsArray = await response.data.drinks;
			if (!data) {
				console.log('No data received');
				return;
			}
			setDrinkDetails(data[0]);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await PopupDrinks();
			} else {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		PopupDrinks();
	}, []);

	useEffect(() => {
		console.log(drinkDetails);
	}, [drinkDetails]);
	return (
		<div className={className + ' drink-slide'} key={idDrink}>
			<img
				className="drink-slide__img"
				src={strDrinkThumb}
				alt={strDrink}
			/>
			<div className="drink-slide__text">
				<p>
					<span className="drink-slide__text_bold">Name</span>
					{' : '}
					{strDrink}
				</p>
				{drinkDetails?.strAlcoholic == null ? (
					''
				) : (
					<p>
						<span className="drink-slide__text_bold">
							Alcoholic
						</span>{' '}
						: {drinkDetails.strAlcoholic}
					</p>
				)}
				{drinkDetails?.strCategory == null ? (
					''
				) : (
					<p>
						<span className="drink-slide__text_bold">
							Category{' '}
						</span>{' '}
						: {drinkDetails.strCategory}
					</p>
				)}
				{drinkDetails?.strIBA == null ? (
					''
				) : (
					<p>
						<span className="drink-slide__text_bold">IBA </span>:{' '}
						{drinkDetails.strIBA}
					</p>
				)}
				{drinkDetails?.strGlass == null ? (
					''
				) : (
					<p>
						<span className="drink-slide__text_bold">Glass </span>:{' '}
						{drinkDetails.strGlass}
					</p>
				)}
				{drinkDetails?.strInstructions == null ? (
					''
				) : (
					<p>
						<span className="drink-slide__text_bold">
							Instruction{' '}
						</span>
						: {drinkDetails.strInstructions}
					</p>
				)}
			</div>
			<div className="drink-slide__ingridients">
				<p>
					{drinkDetails?.strIngredient1 == null ? (
						''
					) : (
						<p className="drink-slide__ingridient">
							{drinkDetails.strIngredient1}
							{drinkDetails.strMeasure1 && ' : '}
							{drinkDetails.strMeasure1}
							<IngridientPopup
								className="drink-slide__ingridient-popup"
								imageLink={drinkDetails.strIngredient1}
							/>
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient2 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient2}
							{drinkDetails.strMeasure2 && ' : '}
							{drinkDetails.strMeasure2}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient3 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient3}
							{drinkDetails.strMeasure3 && ' : '}
							{drinkDetails.strMeasure3}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient4 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient4}
							{drinkDetails.strMeasure4 && ' : '}
							{drinkDetails.strMeasure4}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient5 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient5}
							{drinkDetails.strMeasure5 && ' : '}
							{drinkDetails.strMeasure5}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient6 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient6}
							{drinkDetails.strMeasure6 && ' : '}
							{drinkDetails.strMeasure6}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient7 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient7}
							{drinkDetails.strMeasure7 && ' : '}
							{drinkDetails.strMeasure7}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient8 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient8}
							{drinkDetails.strMeasure8 && ' : '}
							{drinkDetails.strMeasure8}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient9 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient9}
							{drinkDetails.strMeasure9 && ' : '}
							{drinkDetails.strMeasure9}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient10 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient10}
							{drinkDetails.strMeasure10 && ' : '}
							{drinkDetails.strMeasure10}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient11 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient11}
							{drinkDetails.strMeasure11 && ' : '}
							{drinkDetails.strMeasure11}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient12 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient12}
							{drinkDetails.strMeasure12 && ' : '}
							{drinkDetails.strMeasure12}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient13 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient13}
							{drinkDetails.strMeasure13 && ' : '}
							{drinkDetails.strMeasure13}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient14 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient14}
							{drinkDetails.strMeasure14 && ' : '}
							{drinkDetails.strMeasure14}
						</p>
					)}
				</p>
				<p>
					{drinkDetails?.strIngredient15 == null ? (
						''
					) : (
						<p>
							{drinkDetails.strIngredient15}
							{drinkDetails.strMeasure15 && ' : '}
							{drinkDetails.strMeasure15}
						</p>
					)}
				</p>
			</div>
		</div>
	);
};

export default DrinkSlide;
