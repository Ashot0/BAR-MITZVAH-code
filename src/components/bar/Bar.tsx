import React, { useEffect, useState, useRef } from 'react';
import './bar.scss';
import Shelf from '../shelf/Shelf';
import Popup from '../popup/Popup';
import Barmen from '../barmen/Barmen';
import CoctailsPopup from '../cocktailsPopup/CoctailsPopup';
import axios from 'axios';

interface IBarProps {
	className?: string;
	menuLink: string;
	menuOpen: () => void;
}

const Bar: React.FC<IBarProps> = ({
	className = '',
	menuLink = '',
	menuOpen,
}) => {
	const names1: string[] = [
		'Light rum',
		'Dark rum',
		'Sweet Vermouth',
		'Strawberry schnapps',
		'Brandy',
		'Campari',
		'Vodka',
		'Aperol',
		'Sambuca',
		'Ale',
		'Scotch',
		'Gin',
		'Tequila',
		'Rum',
		'Southern Comfort',
		'Root beer',
		'Blended whiskey',
		'Dry Vermouth',
	];
	const names2: string[] = [
		'Vermouth',
		'Applejack',
		'Ricard',
		'Sherry',
		'Everclear',
		'Ouzo',
		// 'Apple brandy',
		'Black Sambuca',
		'Lager',
		'Whiskey',
		'Pisco',
		'Cider',
		'Champagne',
		'Bourbon',
		'Bitters',
		'Kahlua',
		'Port',
		'Guinness',
		'Prosecco',
	];
	const names3: string[] = [
		'Cherry brandy',
		'Coffee liqueur',
		'Blue curacao',
		'Irish whiskey',
		'Galliano',
		'Sloe gin',
		'Peach Vodka',
		'Spiced rum',
		'Absolut Citron',
		'Johnnie Walker',
		'Irish cream',
		'Blackberry brandy',
		'Midori melon liqueur',
		'Peppermint schnapps',
		'Creme de Cassis',
		'Dubonnet Rouge',
		'Apfelkorn',
		'Bacardi',
	];
	const [popup, setPopup] = useState(false);
	const [popupCoctails, setPopupCoctails] = useState(false);
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [cocktails, setCocktails] = useState('');
	const prevValueRef = useRef<string | null>(null);

	const PopupClose = () => {
		setPopup(!popup);
	};
	const PopupCoctailsClose = () => {
		setPopupCoctails(!popupCoctails);
	};

	const PopupFunction = (
		imageLink: string,
		descriptionLink: string,
		cocktailsLink: string
	) => {
		setPopupCoctails(false);
		setPopup(false);
		setDescription(descriptionLink);
		setImage(imageLink);
		setCocktails(cocktailsLink);
		setPopup(!popup);
	};
	const PopupCoctailsFunction = () => {
		setPopup(false);
		setPopupCoctails(true);
	};
	// const BarmenCoctailsFunction = async () => {
	// 	setCocktails('https://www.thecocktaildb.com/api/json/v1/1/random.php');
	// 	setPopup(false);
	// 	setPopupCoctails(true);
	// };
	const CloseWallFunction = () => {
		setPopup(false);
		setPopupCoctails(false);
	};

	useEffect(() => {
		if (
			prevValueRef.current !== null &&
			prevValueRef.current !== menuLink
		) {
			CloseWallFunction();
			setCocktails(menuLink);
			setPopupCoctails(true);
		}
		prevValueRef.current = menuLink;
	}, [menuLink]);

	return (
		<div className={className + ' bar'}>
			{popup ? (
				<div
					onClick={CloseWallFunction}
					className="bar__close-wall"
				></div>
			) : (
				<>
					{popupCoctails ? (
						<div
							onClick={CloseWallFunction}
							className="bar__close-wall"
						></div>
					) : (
						''
					)}
				</>
			)}
			<div className="bar__bar-top">
				<div className="bar__shelves shelves">
					{popup && (
						<Popup
							close={PopupClose}
							openCoctails={PopupCoctailsFunction}
							descriptionLink={description}
							cocktailsLink={cocktails}
							imageLink={image}
						/>
					)}
					{popupCoctails && (
						<CoctailsPopup
							close={PopupCoctailsClose}
							cocktailsLink={cocktails}
						/>
					)}
					<Shelf
						func={PopupFunction}
						names={names1}
						className="shelves__shelf"
						tabIndex={0}
					/>
					<Shelf
						func={PopupFunction}
						names={names2}
						className="shelves__shelf"
						tabIndex={30}
					/>
					<Shelf
						func={PopupFunction}
						names={names3}
						className="shelves__shelf"
						tabIndex={60}
					/>
				</div>
				<img
					className="bar__neon"
					src="./Images/Component neon.png"
					alt=""
				/>
			</div>
			<div className="bar__bar-bootom">
				<Barmen func={menuOpen} className="bar__barmen" />
				<img
					className="bar__counter"
					src="./Images/Component bar.png"
					alt=""
				/>
			</div>
		</div>
	);
};
export default Bar;
