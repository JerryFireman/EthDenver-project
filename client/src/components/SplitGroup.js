import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import Button from './Button';
import { LARGE, DUSK } from '../Utils/constant';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import getWeb3 from '../getWeb3';

export default class SplitGroup extends Component {
	state = {
		selectedGroup: '',
		step: 1,
		selectedMembers: [ '' ],
		active: false,
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

	splitGroup = async (event) => {
		event.preventDefault()
		const { accounts, contract } = this.state;
		var newGroupNum = parseInt(this.state.selectedGroup) + 1;

		const response = await contract.methods.splitGroup(this.state.selectedGroup, this.state.selectedMembers, newGroupNum).send({ from: accounts[0] });
		const newGroup = await contract.methods.createGroup("newGroup", this.state.groupNumber).call();
		this.setState({ groupNumber: newGroupNum });

		var splitMembers = this.state.selectedMembers;
		for (var i = 0; i < splitMembers.length; i++) {
			await contract.methods.joinGroup(splitMembers[i], this.state.groupNumber).send({ from: accounts[0] });
		}
	}; 

	createGroup = async (event) => {
		event.preventDefault()
		
		const { accounts, contract } = this.state;
		const response = await contract.methods.createGroup(this.state.input, this.state.groupNumber).call();
	  
		// Update state with the result.
		this.setState({ groupNumber: response <= this.state.groupNumber ? parseInt(this.state.groupNumber) + 1 : response, groupName: this.state.input });
	  };

	handleChange = (event) => {
		this.setState({ selectedGroup: event.target.value });
	};
	handleMemberChange = (event) => {
		this.setState({ selectedMembers: event.target.value });
	};
	handleOnClick = () => {
		this.setState({ step: 2 });
	};
	handleDoneOnClick = () => {
		const { setSplitGroupVisibility } = this.props;
		setSplitGroupVisibility(false);
		console.log('Done!!');
	};
	closeModal = () => {};
	render() {
		const ITEM_HEIGHT = 48;
		const ITEM_PADDING_TOP = 8;
		const MenuProps = {
			PaperProps: {
				style: {
					maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
					width: 250
				}
			}
		};
		const { showModal, action, message, title, disableBackdropClick } = this.props;
		const { selectedGroup, step, selectedMembers } = this.state;
		return (
			<div>
				<Dialog
					// disableBackdropClick={true}
					aria-describedby="alert-dialog-description"
					onClose={this.closeModal}
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
					}}>
					<DialogTitle id="simple-dialog-title">New Vote</DialogTitle>
					<DialogContent>
						<TextWhite>Split Group</TextWhite>
						{step === 1 ? (
							<Fragment>
								<FormControl style={{ minWidth: 250 }}>
									<InputLabel id="demo-simple-select-label">
										Select A Group You like to split
									</InputLabel>
									<Select
										autoWidth
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={selectedGroup}
										onChange={this.handleChange}>
										<MenuItem value={10}>Group1</MenuItem>
										<MenuItem value={20}>Group2</MenuItem>
									</Select>
								</FormControl>
								<ActionWrapper>
									<Button width={150} label={'Split'} handleOnClick={this.handleOnClick} />
								</ActionWrapper>
							</Fragment>
						) : (
							<Fragment>
								<FormControl style={{ minWidth: 250 }}>
									<InputLabel id="demo-mutiple-checkbox-label">
										Select Members to New Group
									</InputLabel>
									<Select
										labelId="demo-mutiple-checkbox-label"
										id="demo-mutiple-checkbox"
										multiple
										value={selectedMembers}
										onChange={this.handleMemberChange}
										input={<Input />}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={MenuProps}
									>
										{[ 'name1', 'name2' ].map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={selectedMembers.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<ActionWrapper>
									<Button width={150} label={'Done'} handleOnClick={this.splitGroup && this.handleDoneOnClick} />
								</ActionWrapper>
							</Fragment>
						)}
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const TextWhite = styled.div`
	color: white;
	display: flex;
	margin: 50px 0;
	font-size: ${LARGE};
`;
const ActionWrapper = styled.div`
	display: flex;
	margin-bottom: 30px;
	justify-content: space-around;
`;
