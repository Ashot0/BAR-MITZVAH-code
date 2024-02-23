import React, { useState } from 'react';

import './shelf.scss';
import Bottle from '../bottle/Bottle';

interface IShelfProps {
	className?: string;
	names?: string[];
	func: {
		(
			imageLink: string,
			descriptionLink: string,
			cocktailsLink: string
		): void;
	};
}

const Shelf: React.FC<IShelfProps> = ({ className = '', names, func }) => {
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

	const handleTouchStart = (index: number) => {
		setFocusedIndex(index);
	};

	const handleTouchEnd = () => {
		setFocusedIndex(null);
	};
	return (
		<div className={className + ' shelf'}>
			<div className="shelf__bottles">
				{names?.map((name, index) => (
					<Bottle
						func={func}
						name={name}
						key={name}
						className={focusedIndex === index ? 'focus' : ' '}
						onTouchStart={() => handleTouchStart(index)}
						onTouchEnd={handleTouchEnd}
						tabIndex={index}
					/>
				))}
			</div>
			<img
				src="./Images/shelf.png"
				className="shelf__botom"
				alt="shelf"
			/>
		</div>
	);
};

export default Shelf;
