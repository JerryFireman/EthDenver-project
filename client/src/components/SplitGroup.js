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

export default class SplitGroup extends Component {
	state = {
		selectedGroup: '',
		step: 1,
		selectedMembers: [ '' ],
		active: false,
		newGroupName: ''
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
	onNameChange = (name) => {
		this.setState({ newGroupName: name });
	};
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
		const { selectedGroup, step, selectedMembers, newGroupName } = this.state;
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
					}}
				>
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
										onChange={this.handleChange}
									>
										<MenuItem value={10}>Group1</MenuItem>
										<MenuItem value={20}>Group2</MenuItem>
									</Select>
								</FormControl>

								<TextWhite>new Group Name:</TextWhite>

								<TextInput
									value={newGroupName}
									onChange={({ target }) => this.onNameChange(target.value)}
									placeholder={'e.g. backend'}
								/>
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
									<Button width={150} label={'Done'} handleOnClick={this.handleDoneOnClick} />
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
const TextInput = styled.input`
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
