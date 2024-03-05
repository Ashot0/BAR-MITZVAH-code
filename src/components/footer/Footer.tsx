import React from 'react';

import './footer.scss';

export default function Footer({ menuOpen }: { menuOpen: () => void }) {
	return (
		<div className="footer">
			<div className="footer__wrapper">
				<p>Made by Illia Golovan</p>
				<a href="https://github.com/Ashot0">Github</a>
				<a href="https://www.linkedin.com/in/illia-golovan-816a14269/">
					LinkedIn
				</a>
			</div>
			<p className="footer__sou">
				When creating the website, the following were used:
				<a href="https://www.thecocktaildb.com/">TheCocktailDB</a>
				<a href="https://www.mediawiki.org/wiki/MediaWiki">MediaWiki</a>
				<a href="https://www.pngwing.com/ru">PngWing</a>
				<a href="https://www.klipartz.com/ru">Klipartz</a>
			</p>
			<div className="footer__menu-open" onClick={menuOpen}>
				<img
					className="footer__menu-image"
					src="./Images/menu.png"
					alt=""
				/>
			</div>
		</div>
	);
}
