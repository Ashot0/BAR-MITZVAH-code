import React from 'react';

import './barmen.scss';

interface IBarmen {
	className?: string;
	func: () => void;
}

const Barmen: React.FC<IBarmen> = ({ className = '', func }) => {
	const playSound = () => {
		const audio = new Audio('./Sounds/barmen.mp3');
		audio.play();
		func();
	};

	const onClickTransparent = () => {};
	const onClickOpaque = () => {
		playSound();
	};

	const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
		const x = event.nativeEvent.offsetX;
		const y = event.nativeEvent.offsetY;
		const img = event.currentTarget;
		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.drawImage(img, 0, 0, img.width, img.height);
		const pixelData = ctx.getImageData(x, y, 1, 1).data;
		if (pixelData[3] === 0) {
			onClickTransparent();
		} else {
			onClickOpaque();
		}
	};
	return (
		<div className={className + ' barmen'}>
			<img
				onClick={handleClick}
				className="barmen__image"
				src="./Images/barmen.png"
				alt=""
			/>
		</div>
	);
};

export default Barmen;
