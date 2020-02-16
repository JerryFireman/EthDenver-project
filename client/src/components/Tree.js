import React, { Component } from 'react';
import 'treeflex/dist/css/treeflex.css';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import getWeb3 from '../getWeb3';

export default class Tree extends Component {
	state = { 		
		storageValue: 0, 
		web3: null, 
		accounts: null, 
		contract: null, 
		input: null,
		groupName: null,
		groupNumber: 0,
		groupInput: null,
		memberName: null,
		memberNumber: null,
		group: null,
		member: null,
		groupMembers: null,
		memberVote: null,
		voteCount: null
	};

	 componentDidMount = async () => {
		console.log(this.props.groupArray);
		console.log(this.props.treeGroup);

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

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
	};

	readGroup = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.readGroup(this.state.groupNumber).call();
	};

	readMember = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.readMember(this.state.input).call();

		this.setState({ member: response});
	};

	readMemberListInGroup = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.readMemberListInGroup(this.state.input).call();

		this.setState({ groupMembers: response });
	  };

	render() {
		return (
			<div>
				<div className="tf-tree">
					<ul>
						<li>
							<span className="tf-nc">1</span>
							<ul>
								<li>
									<span className="tf-nc">2</span>
								</li>
								<li>
									<span className="tf-nc">3</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
