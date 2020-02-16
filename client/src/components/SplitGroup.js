import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import Button from './Button';
import { LARGE, DUSK } from '../Utils/constant';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class SplitGroup extends Component {
	state = {
		selectedGroup: null
	};
	handleChange = (event) => {
		this.setState({ selectedGroup: event.target.value });
	};
	render() {
		const { closeModal, showModal, action, message, title, disableBackdropClick } = this.props;
		const { inputArray } = this.state;
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
					<DialogTitle id="simple-dialog-title">New Vote</DialogTitle>
					<DialogContent>
						<TextWhite>Split Group</TextWhite>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Age</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={'age'}
								onChange={this.handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</DialogContent>
					<ActionWrapper>
						<Button width={150} label={'Create'} handleOnClick={this.handleOnClick} />
					</ActionWrapper>
				</Dialog>
			</div>
		);
	}
}

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
const TextWhite = styled.div`
	color: white;
	display: flex;
	margin: 50px 0;
	font-size: ${LARGE};
`;
const DialogContentWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
const ActionWrapper = styled.div`
	display: flex;
	margin-bottom: 30px;
	justify-content: space-around;
`;
