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
		personName: [ '' ]
	};
	handleChange = (event) => {
		this.setState({ selectedGroup: event.target.value });
	};
	handleMemberChange = (event) => {
		console.log('event', event);
		this.setState({ selectedMembers: event.target.value });
	};
	handleOnClick = () => {
		this.setState({ step: 2 });
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
		const { closeModal, showModal, action, message, title, disableBackdropClick } = this.props;
		const { selectedGroup, step, selectedMembers } = this.state;
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
							</Fragment>
						) : (
							<FormControl style={{ minWidth: 250 }}>
								<InputLabel id="demo-mutiple-checkbox-label">Select Members to New Group</InputLabel>
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
						)}
					</DialogContent>
					<ActionWrapper>
						<Button width={150} label={'Split'} handleOnClick={this.handleOnClick} />
					</ActionWrapper>
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
