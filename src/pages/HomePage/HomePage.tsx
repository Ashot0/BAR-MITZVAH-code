import React from 'react';

import './home-page.scss';
import Header from '../../components/header/Header';
import Bar from '../../components/bar/Bar';
import Footer from '../../components/footer/Footer';

export default function HomePage() {
	return (
		<div className="home-page">
			<Header />
			<Bar />
			<Footer />
		</div>
	);
}
