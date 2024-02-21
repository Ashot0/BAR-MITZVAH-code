import React, { useEffect, useState } from 'react';
import './bottle.scss';
import useBottle from '../../hooks/useBottle';

interface IBottleProps {
	className?: string;
	name: string;
	func: any;
}

const Bottle: React.FC<IBottleProps> = ({ className = '', name, func }) => {
	const { imageLink, descriptionLink, cocktailsLink } = useBottle({
		name,
	});
	const handleClick = () => {
		// window.open(descriptionLink, '_blank');
		func(descriptionLink, cocktailsLink);
	};
	return (
		<div className={`${className} bottle`}>
			<p className="bottle__text">{name}</p>
			<div className="bottle__wrapper">
				<img
					onClick={handleClick}
					className="bottle__images"
					src={imageLink}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Bottle;
