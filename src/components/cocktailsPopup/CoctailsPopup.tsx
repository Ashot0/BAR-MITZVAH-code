import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './coctails-popup.scss';
import DrinksSlider from '../drinksSlider/DrinksSlider';
interface ICoctailsPopupProps {
	className?: string;
	cocktailsLink: string;
	close: () => void;
}

const CoctailsPopup: React.FC<ICoctailsPopupProps> = ({
	className = '',
	cocktailsLink,
	close,
}) => {
	const [drinks, setDrinks] = useState([]);

	const PopupDrinks = async () => {
		const reduse: any = await axios.get(cocktailsLink);
		setDrinks(reduse.data.drinks);
	};
	useEffect(() => {
		PopupDrinks();
	}, []);
	return (
		<div className={className + ' coctails-popup'}>
			<button
				onClick={close}
				className="coctails-popup__close-btn"
				type="button"
			>
				<img
					className="coctails-popup__close-img"
					src="./Images/x.png"
					alt=""
				/>
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