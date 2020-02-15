import React from 'react';
import {
	// BrowserRouter as Router,
	Switch,
	Route,
	HashRouter
} from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Home from './pages/Home';
import Modal from './components/Modal';
import Test from '../../test';

function App() {
	return (
		<HashRouter>
			<Switch>
				<Header />
				<Modal />
				<Container>
					<Route exact path="/" component={Home} />
					<Route path="/test" component={Test} />
				</Container>
			</Switch>
		</HashRouter>
	);
}

export default App;
