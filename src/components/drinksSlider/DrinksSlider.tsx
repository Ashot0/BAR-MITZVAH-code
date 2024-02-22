import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';

import './drinks-slider.scss';
import DrinkSlide from '../drinkSlide/DrinkSlide';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IDrinksSliderProps {
	className?: string;
	drinksArray: Array<IDrink>;
}
interface IDrink {
	strDrink: string;
	strDrinkThumb: string;
	idDrink: string;
}

const DrinksSlider: React.FC<IDrinksSliderProps> = ({
	className = '',
	drinksArray,
}) => {
	return (
		<Swiper
			modules={[Scrollbar, A11y]}
			spaceBetween={50}
			slidesPerView={1}
			// autoHeight={true}
			scrollbar={{ draggable: true }}
			className={className + ' drinks-slider'}
		>
			{drinksArray.map((drink: IDrink) => (
				<SwiperSlide key={drink.idDrink}>
					<DrinkSlide
						strDrink={drink.strDrink}
						strDrinkThumb={drink.strDrinkThumb}
						idDrink={drink.idDrink}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default DrinksSlider;
