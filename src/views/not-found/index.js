/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<article className="container">
			<h1>404</h1>
			<p>Such empty!</p>
			<Link to="/">Home</Link>
		</article>
	);
}