import React, { Component, Fragment } from 'react';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';
import Header from './components/Header';
import Container from './components/Container';
import Main from './pages/Main';
import './App.css';
import Sidebar2 from './components/Sidebar2.js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Sidebar from './components/Sidebar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LARGE } from './Utils/constant.js';
import ProfileHover from 'profile-hover';

class Test extends Component {
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
		voteCount: null,
		tree: null
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
		event.preventDefault();

		const { accounts, contract } = this.state;
		await contract.methods.set(this.state.value).send({ from: accounts[0] });
		const response = await contract.methods.readOrganizationName().call();

		// Update state with the result.
		this.setState({ groupName: response });
	};

	createMember = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods.createMember(this.state.input, accounts[0]).call();

		// Update state with the result.
		this.setState({
			memberNumber: response <= this.state.memberNumber ? parseInt(this.state.memberNumber) + 1 : response,
			memberName: this.state.input
		});
	};

	createGroup = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods.createGroup(this.state.input, this.state.groupNumber).call();

		// Update state with the result.
		this.setState({
			groupNumber: response <= this.state.groupNumber ? parseInt(this.state.groupNumber) + 1 : response,
			groupName: this.state.input
		});
	};

	joinGroup = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods
			.joinGroup(this.state.input, this.state.groupNumber)
			.send({ from: accounts[0] });
	};

	readGroup = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods.readGroup(this.state.input).call();

		var currGroup = [];
		currGroup.push({ groupNumber: response[0].toString() });
		currGroup.push({ subGroupOf: response[1].toString() });
		currGroup.push({ name: this.state.groupName.toString() });
		currGroup.push({ memberCount: response[3].toString() });

		// Update state with the result.
		this.setState({ group: JSON.stringify(currGroup) });
	};

	readMember = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods.readMember(this.state.input).call();

		var currMember = [];
		currMember.push({ userNumber: response[0].toString() });
		currMember.push({ name: this.state.memberName.toString() });
		currMember.push({ address: response[2].toString() });
		// Update state with the result.
		this.setState({ member: JSON.stringify(currMember) });
	};

	readMemberListInGroup = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods.readMemberListInGroup(this.state.input).call();

		// Update state with the result.
		console.log(response[0]);
		var res = [];

		for (var i = 0; i < response.length; i++) console.log(res[i]);

		this.setState({ groupMembers: response });
	};

	readMemberVote = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods.readMemberVote(this.state.input).call();

		// Update state with the result.
		this.setState({ memberVote: response });
	};

	countVotes = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		const response = await contract.methods.countVotes(this.state.input).call();

		// Update state with the result.
		this.setState({ voteCount: response.toString() });
	};

	executeVote = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.state;
		try {
			const vote = this.state.input == 1 ? true : false;
			const response = await contract.methods
				.executeVote(this.state.memberNumber, true)
				.send({ from: accounts[0] });
		} catch (e) {
			console.log(e);
		}
	};

	splitGroup = async (event) => {
		event.preventDefault();
		var res = [];
		res.push(1);
		const { accounts, contract } = this.state;
		var newGroup = parseInt(this.state.groupNumber);
		const response = await contract.methods
			.splitGroup(this.state.groupNumber, res, newGroup)
			.send({ from: accounts[0] });
	};

	buildTreeStructure = async () => {
		const { accounts, contract } = this.state;
		const numGroups = this.state.groupNumber;
		const treeGroups = [];
		for (var i = 1; i <= numGroups; i++) {
			const currGroup = await contract.methods.readMemberListInGroup(i).call();
			const currGroupMembers = [];
				for (var j = 1; j <= currGroup.length; j++) {
					const currMember = await contract.methods.readMember(j).call();
					currGroupMembers.push(currMember);
				}
			treeGroups.push(currGroupMembers);
		}
		console.log(treeGroups);
		//this.setState({ tree: treeGroups.toString() });
	}

	handleChange = async (e) => {
		//e.preventDefault()
		console.log(e.target.value);
		this.setState({ input: e.target.value });
	};

	render() {
		const { currentActiveTab } = this.props;
		console.log('currentActiveTab', currentActiveTab);
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<Fragment>
				<Header />
				<Container>
					<Sidebar2 />
					<Wrapper>
						<div className="App">
							<div><br></br></div>
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

							{currentActiveTab === 0 && (
								<Fragment>
									<Wrapper2>
										<TextWhite>Group Name:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. Backend'} />
										{/* <input type="text" onChange={this.handleChange} /> */}

										<Button variant="contained" onClick={this.createGroup}>
											Create Group
										</Button>
									</Wrapper2>

									<Wrapper2>
										<TextWhite>Member Number:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. 0'} />
										{/* <input type="text" onChange={this.handleChange} /> */}

										<Button variant="contained" onClick={this.joinGroup}>
											Join Group
										</Button>
									</Wrapper2>
								</Fragment>
							)}

							{currentActiveTab === 1 && (
								<Fragment>
									<Wrapper2>
										<TextWhite>Member Number:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. 0'} />

										<Button variant="contained" onClick={this.readMember}>
											Read Member
										</Button>
									</Wrapper2>

									<Wrapper2>
										<TextWhite>Group Number:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. 0'} />

										<Button variant="contained" onClick={this.splitGroup}>
											Split Group
										</Button>
									</Wrapper2>
								</Fragment>
							)}

							{currentActiveTab === 2 && (
								<Fragment>
									<Wrapper2>
										<TextWhite>Group Number:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. 0'} />

										<Button variant="contained" onClick={this.countVotes}>
											Count Votes
										</Button>
									</Wrapper2>

									<Wrapper2>
										<TextWhite>Vote:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. 0'} />

										<Button variant="contained" onClick={this.executeVote}>
											Enter 1 to Vote "Split Group"
										</Button>
									</Wrapper2>
								</Fragment>
							)}

							{currentActiveTab === 3 && (
								<Fragment>
									<Wrapper2>
										<TextWhite>Member Name:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. 0'} />

										<Button variant="contained" onClick={this.createMember}>
											Create Member
										</Button>
									</Wrapper2>

									<Wrapper2>
										<TextWhite>Group Number:</TextWhite>
										<TextInput onChange={this.handleChange} placeholder={'e.g. 0'} />

										<Button variant="contained" onClick={this.readMemberListInGroup}>
											Read Group Member List
										</Button>
									</Wrapper2>
								</Fragment>
							)}
						</div>
					</Wrapper>
				</Container>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('state', state);
	return {
		currentActiveTab: state.common.currentActiveTab
	};
};

export default connect(mapStateToProps, null)(Test);

const Wrapper = styled.div`
	width: 100%;
	background: #29344b;
	color: white;
`;
const TextInput = styled.input`
	font-size: 20px;
	color: white;
	height: 51px;
	background-color: #36435d;
	border: none;
	padding: 5px 10px;
	box-sizing: border-box;
	width: 100%;
	caret-color: white;
	margin-bottom: 10px;
	::placeholder {
		color: rgba(255, 255, 255, 0.3);
		font-size: 15px;
	}
	&:focus {
		outline: none;
	}
`;
const TextWhite = styled.div`
	color: white;
	display: flex;
	margin: 20px 0;
	font-size: ${LARGE};
`;
const Wrapper2 = styled.div`
	width: 70%;
	margin: auto;
`;
