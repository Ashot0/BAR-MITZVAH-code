import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ingridient-popup.scss';

interface IIngridientPopupProps {
	className?: string;
	imageLink?: string;
}

const IngridientPopup: React.FC<IIngridientPopupProps> = ({
	className = '',
	imageLink,
}) => {
	const [showChild, setShowChild] = useState(false);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleHover = async () => {
		setShowChild(true);
		if (imageSrc) {
			return;
		}

		try {
			setLoading(true);
			const response = `https://www.thecocktaildb.com/images/ingredients/${imageLink}-Small.png`;
			setImageSrc(response);
		} catch (error) {
			console.error('Failed to fetch image:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleLeave = () => {
		setShowChild(false);
	};

	return (
		<div
			onMouseEnter={handleHover}
			onMouseLeave={handleLeave}
			className={className + ' ingridient-popup'}
		>
			{showChild && (
				<div className="ingridient-popup__parent">
					{loading ? (
						<div className="loading">Loading...</div>
					) : (
						<div className="ingridient-popup__child">
							{imageSrc && (
								<img
									className="ingridient-popup__img"
									src={imageSrc}
									alt=""
								/>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default IngridientPopup;
