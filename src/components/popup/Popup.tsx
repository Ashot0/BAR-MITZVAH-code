import React, { useState, useEffect } from 'react';

import './popup.scss';
import axios from 'axios';
import WikiSearch from '../../services/WikiSearch';

interface IPopupProps {
	className?: string;
	imageLink: string;
	descriptionLink: string;
	cocktailsLink: string;
	close: () => void;
	openCoctails: (cocktailsLink: string) => void;
}
interface Ingredient {
	strIngredient: string;
	strDescription: string;
}
interface ResponseData {
	ingredients: Ingredient[];
}
interface Response {
	data: ResponseData;
}
const Popup: React.FC<IPopupProps> = ({
	className = '',
	imageLink,
	descriptionLink,
	cocktailsLink,
	close,
	openCoctails,
}) => {
	const [nameDescription, setNameDescription] = useState('');
	const [strDescription, setStrDescription] = useState('');
	const [completeLoad, setCompleteLoad] = useState(false);

	const PopupDescription = async () => {
		const reduse: Response = await axios.get(descriptionLink);
		setNameDescription(reduse.data.ingredients[0].strIngredient);
		setStrDescription(reduse.data.ingredients[0].strDescription);
		if (strDescription == null) {
			const response: string = await WikiSearch(nameDescription);
			setStrDescription(await response);
		}
		if (completeLoad === false) {
			setCompleteLoad(!completeLoad);
		}
	};
	useEffect(() => {
		PopupDescription();
	}, [completeLoad]);

	const [displayText, setDisplayText] = useState('');
	const [index, setIndex] = useState(0);
	const [full, setFull] = useState(false);

	useEffect(() => {
		if (full === false) {
			if (strDescription != null) {
				if (index < strDescription.length) {
					const timer = setInterval(() => {
						setDisplayText(
							(prevText) => prevText + strDescription[index]
						);
						setIndex((prevIndex) => prevIndex + 1);
					}, 50);
					return () => clearInterval(timer);
				}
			}
		} else {
			setDisplayText(strDescription);
		}
	}, [index, strDescription]);

	useEffect(() => {
		setDisplayText('');
		setIndex(0);
	}, [strDescription]);
	const open = () => {
		openCoctails(cocktailsLink);
	};
	const handleFullText = () => {
		setFull(true);
		setDisplayText(strDescription);
	};

	return (
		<div className={className + ' popup'}>
			<button onClick={close} className="popup__close-btn" type="button">
				<img className="popup__close-img" src="./Images/x.png" alt="" />
			</button>
			<p className="popup__title">
				{nameDescription}
				<img className="popup__title-image" src={imageLink} alt="" />
				<button
					className="popup__open-drinks"
					type="button"
					onClick={open}
				>
					[Coctails]
				</button>
			</p>
			<p onClick={handleFullText} className="popup__text">
				{displayText ? <span>{displayText}</span> : ' '}
				{!full ? <span className="popup__line">|</span> : ' '}
			</p>
		</div>
	);
};

export default Popup;
