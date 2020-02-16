import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import Button from './Button';
import { LARGE, DUSK } from '../Utils/constant';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default class CreateVote extends Component {
	state = {
		inputArray: [ '' ]
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
					<DialogTitle id="simple-dialog-title">Create New Groups</DialogTitle>
					<DialogContent>
						<Button blue width={150} label={'Create'} handleOnClick={this.handleOnClick} />
						<Button blue width={150} label={'Create'} handleOnClick={this.handleOnClick} />

						<AddBoxIcon onClick={this.handleOnAdd} />
					</DialogContent>
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
