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

export default class MergeGroup extends Component {
	state = {
		selectedGroup: '',
		step: 1,
		selectedMembers: [ '' ],
		active: false
	};
	handleMemberChange = (event) => {
		this.setState({ selectedMembers: event.target.value });
	};
	handleOnClick = () => {
		const { setMergeGroupVisibility } = this.props;
		setMergeGroupVisibility(false);
		console.log('Merge!!');
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
					}}
				>
					<DialogTitle id="simple-dialog-title">New Vote</DialogTitle>
					<DialogContent>
						<TextWhite>Merge Group</TextWhite>
						<Fragment>
							<FormControl style={{ minWidth: 250 }}>
								<InputLabel id="demo-mutiple-checkbox-label">
									Select Groups You Like to Merge
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
								<Button width={150} label={'Merge'} handleOnClick={this.handleOnClick} />
							</ActionWrapper>
						</Fragment>
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
