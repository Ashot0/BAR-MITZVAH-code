import React from 'react';

import './shelf.scss';
import Bottle from '../bottle/Bottle';

interface IShelfProps {
	className?: string;
	names?: string[];
	func: {
		(descriptionLink: string, cocktailsLink: string): void;
	};
}

const Shelf: React.FC<IShelfProps> = ({ className = '', names, func }) => {
	return (
		<div className={className + ' shelf'}>
			<div className="shelf__bottles">
				{names?.map((name) => (
					<Bottle func={func} name={name} key={name} />
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
