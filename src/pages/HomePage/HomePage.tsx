import React, { useState } from 'react';

import './home-page.scss';
import Header from '../../components/header/Header';
import Bar from '../../components/bar/Bar';
import Footer from '../../components/footer/Footer';
import MenuBook from '../../components/menuBook/MenuBook';

export default function HomePage() {
	const [menuLink, setMenuLink] = useState('');
	const [menuVisible, setMenuVisible] = useState(false);
	const MenuPopup = (Link: string) => {
		setMenuVisible(false);
		setMenuLink(Link);
	};
	const menuOpen = () => {
		setMenuVisible(!menuVisible);
	};
	return (
		<div className="home-page">
			<Header />
			<Bar menuOpen={menuOpen} menuLink={menuLink} />
			{menuVisible && <MenuBook menuOpen={menuOpen} func={MenuPopup} />}
			<Footer menuOpen={menuOpen} />
		</div>
	);
}
