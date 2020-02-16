import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import Button from './Button';
import { LARGE, DUSK } from '../Utils/constant';

export default class CreateVote extends Component {
	state = {};
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
