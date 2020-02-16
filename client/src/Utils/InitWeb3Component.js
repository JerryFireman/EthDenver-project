import React, { Component, Fragment } from 'react';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import getWeb3 from '../getWeb3';
import { initWeb3 } from '../redux/actions';
import { connect } from 'react-redux';

class InitWeb3Component extends Component {
	state = {
		storageValue: 0,
		web3: null,
		accounts: null,
		contract: null,
		groupNumber: 0,
		input: null
	};

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = SimpleStorageContract.networks[networkId];
			const instance = new web3.eth.Contract(
				SimpleStorageContract.abi,
				deployedNetwork && deployedNetwork.address
			);

			instance.events.LogSet((error, event) => {
				console.log(event);
			});
			console.log('init!! web3, accounts, instance', web3, accounts, instance);
			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.props.initWeb3({ web3, accounts, contract: instance });
		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error(error);
		}
	};

	render() {
		return <Fragment />;
	}
}

const mapDispatchToProps = {
	initWeb3
};

export default connect(null, mapDispatchToProps)(InitWeb3Component);
