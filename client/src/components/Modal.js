import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import Button from './Button';
import { LARGE } from '../Utils/constant';

export default class Modal extends Component {
	render() {
		const { closeModal, showModal, action, message, title, disableBackdropClick } = this.props;
		return (
			<div>
				<Dialog
					disableBackdropClick={disableBackdropClick || false}
					aria-describedby="alert-dialog-description"
					onClose={closeModal}
					aria-labelledby="simple-dialog-title"
					open={showModal}
					fullWidth={true}
					maxWidth={'xs'}
					PaperProps={{
						style: {
							backgroundColor: '#202124',
							color: '#fff',
							boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.2)',
							borderRadius: 15
						}
					}}
				>
					<DialogTitle id="simple-dialog-title">{title ? title : ''}</DialogTitle>
					<DialogContent>
						<TextWhite>{message}</TextWhite>
					</DialogContent>
					<ActionWrapper>
						{action ? <Button width={150} label={action.okText} handleOnClick={action.okCallback} /> : null}
						{action && action.CancelText ? (
							<Button width={150} label={action.CancelText} handleOnClick={closeModal} />
						) : null}
					</ActionWrapper>
				</Dialog>
			</div>
		);
	}
}

const Image = styled.img`width: 40px;`;
const TextWhite = styled.div`
	color: white;
	display: flex;
	justify-content: center;
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
