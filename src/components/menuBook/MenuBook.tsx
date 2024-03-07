import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './menu-book.scss';

import { EffectCards } from 'swiper/modules';
import useBookCategory from '../../hooks/useBookCategory';
import useSearchCocktails from '../../hooks/useSearchCocktails';

interface Category {
	strCategory: string;
}

interface Glasses {
	strGlass: string;
}

interface Ingredient {
	strIngredient1: string;
}

interface Alcoholic {
	strAlcoholic: string;
}

interface IMenuBookProps {
	func: (Link: string) => void;
	menuOpen: () => void;
}

const MenuBook: React.FC<IMenuBookProps> = ({ func, menuOpen }) => {
	const category = useBookCategory<Category>(
		'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
		'category'
	);
	const glasses = useBookCategory<Glasses>(
		'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list',
		'glasses'
	);
	const ingredients = useBookCategory<Ingredient>(
		'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
		'ingredients'
	);
	const alcoholic = useBookCategory<Alcoholic>(
		'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list',
		'alcoholic'
	);

	function formatString(input: string): string {
		return input.replace(/\s+/g, '_');
	}

	const menuFunc = (category: string, item: string) => {
		const itemFormat = formatString(item);
		if (category === 'search') {
			func(
				`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemFormat}`
			);
		} else {
			func(
				`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${category}=${itemFormat}`
			);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const swiperWrapper = document.querySelector('.swiper-wrapper');
			if (
				swiperWrapper &&
				!swiperWrapper.contains(event.target as Node)
			) {
				menuOpen();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const { searchTerm, searchResults, handleInputChange } =
		useSearchCocktails();

	return (
		<div className="menu-book menu-book_position">
			<Swiper
				effect={'cards'}
				grabCursor={true}
				modules={[EffectCards]}
				className="mySwiper menu-book__slider"
			>
				<SwiperSlide className="menu-book__slide menu-book__slide_1">
					<img
						className="menu-book__image"
						src="./Images/menu.png"
						alt=""
					/>
				</SwiperSlide>
				<SwiperSlide className="menu-book__slide menu-book__slide_2">
					<p className="menu-book__title_2">
						Search coctail by name:
						<input
							value={searchTerm}
							onChange={handleInputChange}
							placeholder="Search cocktails..."
							className="menu-book__input"
							type="text"
						/>
					</p>
					<div className="menu-book__slide-wrapper">
						{searchResults &&
							searchResults.map((cocktail) => (
								<p
									className="menu-book__slide-text"
									key={cocktail.idDrink}
									onClick={() =>
										menuFunc('search', cocktail.idDrink)
									}
								>
									{cocktail.strDrink}
								</p>
							))}
					</div>
				</SwiperSlide>
				<SwiperSlide className="menu-book__slide menu-book__slide_3">
					<p>Category</p>
					<div className="menu-book__slide-wrapper">
						{category &&
							category.map((item, index) => (
								<p
									className="menu-book__slide-text"
									onClick={() =>
										menuFunc('c', item.strCategory)
									}
									key={index}
								>
									{item.strCategory}
								</p>
							))}
					</div>
				</SwiperSlide>
				<SwiperSlide className="menu-book__slide menu-book__slide_4">
					<p>Glasses</p>
					<div className="menu-book__slide-wrapper">
						{glasses &&
							glasses.map((item, index) => (
								<p
									className="menu-book__slide-text"
									onClick={() => menuFunc('g', item.strGlass)}
									key={index}
								>
									{item.strGlass}
								</p>
							))}
					</div>
				</SwiperSlide>
				<SwiperSlide className="menu-book__slide menu-book__slide_5">
					<p>Ingredient</p>
					<div className="menu-book__slide-wrapper">
						{ingredients &&
							ingredients.map((item, index) => (
								<p
									className="menu-book__slide-text"
									onClick={() =>
										menuFunc('i', item.strIngredient1)
									}
									key={index}
								>
									{item.strIngredient1}
								</p>
							))}
					</div>
				</SwiperSlide>
				<SwiperSlide className="menu-book__slide menu-book__slide_6">
					<p>Alcoholic</p>
					<div className="menu-book__slide-wrapper">
						{alcoholic &&
							alcoholic.map((item, index) => (
								<p
									className="menu-book__slide-text"
									onClick={() =>
										menuFunc('a', item.strAlcoholic)
									}
									key={index}
								>
									{item.strAlcoholic}
								</p>
							))}
					</div>
				</SwiperSlide>
				<SwiperSlide className="menu-book__slide menu-book__slide_7">
					<div className="menu-book__sub">
						<p>Made by Illia Golovan</p>
						<p>
							<a href="https://github.com/Ashot0">Github</a>
						</p>
						<p>
							<a href="https://www.linkedin.com/in/illia-golovan-816a14269/">
								LinkedIn
							</a>
						</p>
						<p>
							When creating the website, the following were used:
						</p>
						<p>
							<a href="https://www.thecocktaildb.com/">
								TheCocktailDB
							</a>
						</p>
						<p>
							<a href="https://www.mediawiki.org/wiki/MediaWiki">
								MediaWiki
							</a>
						</p>
						<p>
							<a href="https://www.pngwing.com/ru">PngWing</a>
						</p>
						<p>
							<a href="https://www.klipartz.com/ru">Klipartz</a>
						</p>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default MenuBook;
