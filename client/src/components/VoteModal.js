import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import Button from './Button';
import { LARGE, DUSK } from '../Utils/constant';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import getWeb3 from '../getWeb3';

export default class CreateVote extends Component {
	state = {
		web3: null, 
		accounts: null, 
		contract: null, 
		inputArray: [ '' ],
		groupName: [ '' ],
		input: null,
		group: "null",
		groupNumber: null,
		memberCount: null
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

	  executeVote = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		try {
			const vote = this.state.input == 1 ? true : false;
			const response = await contract.methods.executeVote(this.state.memberNumber, true).send({ from: accounts[0] });
		} catch (e) {
			console.log(e);
		}
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

	handleOnYesClick = () => {
		const { closeVote } = this.props;
		closeVote();
	};
	handleOnNoClick = () => {
		const { closeVote } = this.props;
		closeVote();
	};
	render() {
		const { closeModal, showModal, action, message, title, disableBackdropClick } = this.props;
		const { isSplitGroupOpen, isMergeGroupOpen } = this.state;
		return (
			<div>
				<Dialog
					// disableBackdropClick={true}
					aria-describedby="alert-dialog-description"
					onClose={closeModal}
					aria-labelledby="simple-dialog-title"
					open={showModal}
					fullWidth={true}
					maxWidth={'xs'}
					PaperProps={{
						style: {
							width: '734px',
							borderRadius: '11px',
							backgroundColor: DUSK
						}
					}}
				>
					<DialogTitle id="simple-dialog-title">Vote 1</DialogTitle>
					<DialogContent>
						Group1 will be split into Group1 and Group2
						<Wrapper>
							<Button blue width={100} label={'Yes'} handleOnClick={this.handleOnYesClick} />
							<Button blue width={100} label={'No'} handleOnClick={this.handleOnNoClick} />
						</Wrapper>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
	margin: 100px 0 60px 0;
`;
