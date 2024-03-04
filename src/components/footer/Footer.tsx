import React from 'react';

import './footer.scss';

export default function Footer() {
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
			</p>
		</div>
	);
}
