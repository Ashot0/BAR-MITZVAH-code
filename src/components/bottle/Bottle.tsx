import React from 'react';
import './bottle.scss';
import useBottle from '../../hooks/useBottle';

interface IBottleProps {
	className?: string;
	name: string;
	func: {
		(
			imageLink: string,
			descriptionLink: string,
			cocktailsLink: string
		): void;
	};
}

const Bottle: React.FC<IBottleProps> = ({ className = '', name, func }) => {
	const { imageLink, descriptionLink, cocktailsLink } = useBottle({
		name,
	});
	const handleClick = () => {
		func(imageLink, descriptionLink, cocktailsLink);
	};
	return (
		<div className={`${className} bottle`}>
			<p className="bottle__text">{name}</p>
			<div className="bottle__wrapper">
				<img
					onClick={handleClick}
					className="bottle__images"
					src={imageLink}
					alt={name}
				/>
			</div>
		</div>
	);
};

export default Bottle;
