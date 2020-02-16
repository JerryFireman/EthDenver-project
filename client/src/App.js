import React from 'react';
import {
	// BrowserRouter as Router,
	Switch,
	Route,
	HashRouter
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Home from './pages/Home';
import Modal from './components/Modal';
import Test from './test';
import InitWeb3Component from './Utils/InitWeb3Component';
import store from './redux/store';

function App() {
	return (
		<HashRouter>
			<Switch>
				<Provider store={store}>
					<InitWeb3Component />
					<Route exact path="/test" component={Home} />
					<Route path="/" component={Test} />
				</Provider>
			</Switch>
		</HashRouter>
	);
}

export default App;
