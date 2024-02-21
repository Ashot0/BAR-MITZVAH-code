import React from 'react';

import './barmen.scss';

const Barmen = ({ className = '' }) => {
	const playSound = () => {
		const audio = new Audio('./Sounds/barmen.mp3');
		audio.play();
	};
	return (
		<div className={className + ' barmen'}>
			<img
				onClick={playSound}
				className="barmen__image"
				src="./Images/barmen.png"
				alt=""
			/>
		</div>
	);
};

export default Barmen;
