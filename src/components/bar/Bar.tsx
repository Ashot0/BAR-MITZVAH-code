import React, { useState } from 'react';
import './bar.scss';
import Shelf from '../shelf/Shelf';
import Popup from '../popup/Popup';
import Barmen from '../barmen/Barmen';

export default function Bar({ className = '' }) {
	const names1: string[] = [
		'Light rum',
		'Dark rum',
		'Sweet Vermouth',
		'Strawberry schnapps',
		'Apricot brandy',
		'Triple sec',
		'Vodka',
		'Aperol',
		'Sambuca',
		'Ale',
		'Scotch',
		'Gin',
		'Tequila',
		'Rum',
		'Southern Comfort',
		'Lemon vodka',
		'Blended whiskey',
		'Dry Vermouth',
	];
	const names2: string[] = [
		'Vermouth',
		'Applejack',
		'Ricard',
		'Sherry',
		'Cognac',
		'Everclear',
		'Ouzo',
		'Apple brandy',
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
		'Añejo rum',
		'Irish whiskey',
		'Creme de Cacao',
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
	const [description, setDescription] = useState('');
	const [cocktails, setCocktails] = useState('');

	const PopupClose = () => {
		setPopup(!popup);
	};

	const PopupFunction = (descriptionLink: string, cocktailsLink: string) => {
		setDescription(descriptionLink);
		setCocktails(cocktailsLink);
		setPopup(!popup);
	};

	return (
		<div className={className + ' bar'}>
			<div className="bar__bar-top">
				<div className="bar__shelves shelves">
					{popup && (
						<Popup
							close={PopupClose}
							descriptionLink={description}
							cocktailsLink={cocktails}
						/>
					)}
					<Shelf
						func={PopupFunction}
						names={names1}
						className="shelves__shelf"
					/>
					<Shelf
						func={PopupFunction}
						names={names2}
						className="shelves__shelf"
					/>
					<Shelf
						func={PopupFunction}
						names={names3}
						className="shelves__shelf"
					/>
				</div>
				<img
					className="bar__neon"
					src="./Images/Component neon.png"
					alt=""
				/>
			</div>
			<div className="bar__bar-bootom">
				<Barmen className="bar__barmen" />
				<img
					className="bar__counter"
					src="./Images/Component bar.png"
					alt=""
				/>
			</div>
		</div>
	);
}
