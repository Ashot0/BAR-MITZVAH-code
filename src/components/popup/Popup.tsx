import React, { useState, useEffect } from 'react';

import './popup.scss';
import axios from 'axios';

interface IPopupProps {
	className?: string;
	descriptionLink: string;
	cocktailsLink: string;
	close: () => void;
	openCoctails: (cocktailsLink: string) => void;
}

const Popup: React.FC<IPopupProps> = ({
	className = '',
	descriptionLink,
	cocktailsLink,
	close,
	openCoctails,
}) => {
	const [nameDescription, setNameDescription] = useState('');
	const [strDescription, setStrDescription] = useState('');

	const PopupDescription = async () => {
		const reduse: any = await axios.get(descriptionLink);
		setNameDescription(reduse.data.ingredients[0].strIngredient);
		setStrDescription(reduse.data.ingredients[0].strDescription);
	};
	useEffect(() => {
		PopupDescription();
	}, []);

	const [displayText, setDisplayText] = useState('');
	const [index, setIndex] = useState(0);

	useEffect(() => {
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
	}, [index, strDescription]);

	useEffect(() => {
		setDisplayText('');
		setIndex(0);
	}, [strDescription]);
	const open = () => {
		openCoctails(cocktailsLink);
	};

	return (
		<div className={className + ' popup'}>
			<button onClick={close} className="popup__close-btn" type="button">
				<img className="popup__close-img" src="./Images/x.png" alt="" />
			</button>
			<p className="popup__title">
				{nameDescription}
				<button
					className="popup__open-drinks"
					type="button"
					onClick={open}
				>
					[Coctails]
				</button>
			</p>
			<p className="popup__text">
				{displayText}
				<span className="popup__line">|</span>
			</p>
		</div>
	);
};

export default Popup;
