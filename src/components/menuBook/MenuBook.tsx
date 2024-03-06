import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './menu-book.scss';

import { EffectCards } from 'swiper/modules';
import axios from 'axios';

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
	const [category, setCategory] = useState<Category[]>();
	const [glasses, setGlasses] = useState<Glasses[]>();
	const [ingredients, setIngredients] = useState<Ingredient[]>();
	const [alcoholic, setAlcoholic] = useState<Alcoholic[]>();

	const FetchCategory = async () => {
		try {
			const response = await axios.get(
				'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
			);
			const sortedArray = await response.data.drinks.sort(
				(a: Category, b: Category) =>
					a.strCategory.localeCompare(b.strCategory)
			);
			setCategory(sortedArray);
		} catch (error) {
			console.error('Error fetching category:', error);
		}
	};

	const FetchGlasses = async () => {
		try {
			const response = await axios.get(
				'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list'
			);
			const sortedArray = await response.data.drinks.sort(
				(a: Glasses, b: Glasses) => a.strGlass.localeCompare(b.strGlass)
			);
			setGlasses(sortedArray);
		} catch (error) {
			console.error('Error fetching glasses:', error);
		}
	};

	const FetchIngredients = async () => {
		try {
			const response = await axios.get(
				'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
			);
			const sortedArray = response.data.drinks.sort(
				(a: Ingredient, b: Ingredient) =>
					a.strIngredient1.localeCompare(b.strIngredient1)
			);
			setIngredients(sortedArray);
		} catch (error) {
			console.error('Error fetching ingredients:', error);
		}
	};

	const FetchAlcoholic = async () => {
		try {
			const response = await axios.get(
				'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list'
			);
			const sortedArray = await response.data.drinks.sort(
				(a: Alcoholic, b: Alcoholic) =>
					a.strAlcoholic.localeCompare(b.strAlcoholic)
			);
			setAlcoholic(sortedArray);
		} catch (error) {
			console.error('Error fetching alcoholic:', error);
		}
	};

	useEffect(() => {
		FetchCategory();
		FetchGlasses();
		FetchIngredients();
		FetchAlcoholic();
	}, []);

	function formatString(input: string): string {
		return input.replace(/\s+/g, '_');
	}

	const menuFunc = (category: string, item: string) => {
		const itemFormat = formatString(item);
		func(
			`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${category}=${itemFormat}`
		);
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
						<input className="menu-book__input" type="text" />
					</p>
					<div className="menu-book__slide-wrapper">
						{/* {category &&
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
							))} */}
						<p>IN PROCESS</p>
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
				{/* <SwiperSlide className="menu-book__slide menu-book__slide_8">
					Slide 8
				</SwiperSlide>
				<SwiperSlide className="menu-book__slide menu-book__slide_9">
					Slide 9
				</SwiperSlide> */}
			</Swiper>
		</div>
	);
};

export default MenuBook;
