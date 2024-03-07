import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './coctails-popup.scss';
import DrinksSlider from '../drinksSlider/DrinksSlider';
import CloseBtn from '../closeBtn/CloseBtn';
import LoadCircle from '../loadCircle/LoadCircle';
interface ICoctailsPopupProps {
	className?: string;
	cocktailsLink: string;
	close: () => void;
}

interface IDrink {
	strDrink: string;
	strDrinkThumb: string;
	idDrink: string;
}

interface ResponseData {
	drinks: IDrink[];
}

const CoctailsPopup: React.FC<ICoctailsPopupProps> = ({
	className = '',
	cocktailsLink,
	close,
}) => {
	const [drinks, setDrinks] = useState<IDrink[]>([]);
	const [loader, setLoader] = useState(false);

	const PopupDrinks = async () => {
		setLoader(true);
		try {
			const response = await axios.get<ResponseData>(cocktailsLink);
			setDrinks(response.data.drinks);
			setLoader(false);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 429) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				PopupDrinks();
			} else {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	useEffect(() => {
		PopupDrinks();
	}, []);
	return (
		<div className={className + ' coctails-popup'}>
			{loader && <LoadCircle />}
			<button
				onClick={close}
				className="coctails-popup__close-btn"
				type="button"
			>
				<CloseBtn className="coctails-popup__close-img" />
			</button>
			<div className="coctails-popup__drinks">
				{drinks == null ? (
					<p className="coctails-popup__drinks_none">
						No cocktails available
					</p>
				) : (
					<DrinksSlider drinksArray={drinks} />
				)}
			</div>
		</div>
	);
};

export default CoctailsPopup;
