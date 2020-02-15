import React, { Component } from 'react';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';

import './App.css';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.setValue = this.setValue.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.createMember = this.createMember.bind(this);
	}

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

	setValue = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;

		// Stores a given value, 5 by default.
		await contract.methods.set(this.state.value).send({ from: accounts[0] });

		// Get the value from the contract to prove it worked.
		const response = await contract.methods.get().call();

		// Update state with the result.
		this.setState({ storageValue: response });
	};

	groupName = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		await contract.methods.set(this.state.value).send({ from: accounts[0] });
		const response = await contract.methods.readOrganizationName().call();
	  
		// Update state with the result.
		this.setState({ groupName: response });
	  };
	  
	  createMember = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.createMember(this.state.input, accounts[0]).call();
	  
		// Update state with the result.
		this.setState({ memberNumber: response <= this.state.memberNumber ? parseInt(this.state.memberNumber) + 1 : response, memberName: this.state.input });
	  };
	  
	  createGroup = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.createGroup(this.state.input, this.state.groupNumber).call();
	  
		// Update state with the result.
		this.setState({ groupNumber: response <= this.state.groupNumber ? parseInt(this.state.groupNumber) + 1 : response, groupName: this.state.input });
	  };
	  
	  joinGroup = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
	  
		// Get the value from the contract to prove it worked.
		const response = await contract.methods.joinGroup(this.state.input, this.state.groupNumber).call();
	  };
	  
	  readGroup = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.readGroup(this.state.input).call();

		var currGroup = [];
		currGroup.push({"groupNumber": response[0].toString()});
		currGroup.push({"subGroupOf": response[1].toString()});
		currGroup.push({"name": this.state.groupName.toString()});
		currGroup.push({"memberCount": response[3].toString()});

		// Update state with the result.
		this.setState({ group: JSON.stringify(currGroup)});
	  };
	  
	  readMember = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.readMember(this.state.input).call();
	  
		var currMember = [];
		currMember.push({"userNumber": response[0].toString()});
		currMember.push({"name": this.state.memberName.toString()});
		currMember.push({"address": response[2].toString()});
		// Update state with the result.
		this.setState({ member: JSON.stringify(currMember)});
	  };
	  
	  readMemberListInGroup = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.readMemberListInGroup(this.state.input).call();
	  
		// Update state with the result.
		console.log(response[0]);
		var res = [];

		for (var i = 0; i < response.length; i++)
		 	console.log(res[i]);


		this.setState({ groupMembers: response[0] });
	  };
	  
	  readMemberVote = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.readMemberVote(this.state.input).call();
	  
		// Update state with the result.
		this.setState({ memberVote: response });
	  }; 
	  
	  countVotes = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.countVotes(this.state.input).call();
	  
		// Update state with the result.
		this.setState({ voteCount: response.toString() });
	  }; 

	handleChange = async (e) => {
		//e.preventDefault()
		console.log(e.target.value);
		this.setState({ input: e.target.value });
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<h1>Good to Go!</h1>
				<p>Your Truffle Box is installed and ready.</p>
				<h2>Smart Contract Example</h2>
				<p>
					If your contracts compiled and migrated successfully, below will show a stored value of 5 (by
					default).
				</p>
				<p>
					Try changing the value stored on <strong>line 40</strong> of App.js.
				</p>
				<div>Group name: {this.state.groupName}</div>
				<div>Group number: {this.state.groupNumber}</div>
				<div>Member name: {this.state.memberName}</div>
				<div>Member number: {this.state.memberNumber}</div>
				<div>Group: {this.state.group}</div>
				<div>Member: {this.state.member}</div>
				<div>Group members: {this.state.groupMembers}</div>
				<div>Member vote: {this.state.memberVote}</div>
				<div>Vote count: {this.state.voteCount}</div>
				<form>
					<button value="Submit" onClick={this.groupName}>
						Submit{' '}
					</button>
				</form>

				<form>
					<label>
						Member Name:
						<input type="text" onChange={this.handleChange} />
					</label>
					<button value="Submit" onClick={this.createMember}>
						Create Member{' '}
					</button>
				</form>

				<form>
					<label>
						Group Name:
						<input type="text" onChange={this.handleChange} />
					</label>
					<button value="Submit" onClick={this.createGroup}>
						Create Group{' '}
					</button>
				</form>

				<form>
					<label>
						Member Number:
						<input type="text" onChange={this.handleChange} />
					</label>
					<button value="Submit" onClick={this.joinGroup}>
						Join Group{' '}
					</button>
				</form>

				<form>
					<label>
						Group Number:
						<input type="text" onChange={this.handleChange} />
					</label>
					<button value="Submit" onClick={this.readGroup}>
						Read Group{' '}
					</button>
				</form>

				<form>
					<label>
						Member Number:
						<input type="text" onChange={this.handleChange} />
					</label>
					<button value="Submit" onClick={this.readMember}>
						Read Member{' '}
					</button>
				</form>

				<form>
					<label>
						Group Number:
						<input type="text" onChange={this.handleChange} />
					</label>
					<button value="Submit" onClick={this.readMemberListInGroup}>
						Read Group Member List{' '}
					</button>
				</form>

				<form>
					<label>
						Group Number:
						<input type="text" onChange={this.handleChange} />
					</label>
					<button value="Submit" onClick={this.countVotes}>
						Count Votes{' '}
					</button>
				</form>
			</div>
		);
	}
}
