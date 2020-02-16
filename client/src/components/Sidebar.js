import React, { Component } from 'react';
import styled from 'styled-components';
import { DUSK } from '../Utils/constant';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
import CreateNewGroupModal from './CreateNewGroupModal';
import CreateVote from './CreateVote';

export default class Sidebar extends Component {
	state = {
		activeIndex: 0,
		menu: [
			{ text: 'Create New Groups', icon: <GroupIcon />, isOpen: false },
			{ text: 'Create Vote', icon: <AddCircleIcon />, isOpen: false },
			{ text: 'Vote', icon: <CreateIcon />, isOpen: false }
		]
	};
	active = (index) => {
		const { menu, activeIndex } = this.state;
		console.log('index', index);
		console.log('activeIndex', activeIndex);
		let newMenu = menu;
		newMenu[index]['isOpen'] = true;
		this.setState({ menu: newMenu, activeIndex: index });
	};
	onClose = (index) => {
		console.log('index', index);
		const { menu } = this.state;
		let newMenu = menu;
		newMenu[index]['isOpen'] = false;
		this.setState({ menu: newMenu });
	};
	//closeModal, showModal, action, message, title, disableBackdropClick
	render() {
		const { menu, activeIndex } = this.state;
		return (
			<Wrapper>
				<CreateNewGroupModal showModal={menu[0].isOpen} closeModal={() => this.onClose(activeIndex)} />
				<CreateVote showModal={menu[1].isOpen} closeModal={() => this.onClose(activeIndex)} />
				<List>
					{menu.map((item, index) => (
						<ListItem key={item.text} onClick={() => this.active(index)} button key={item.text}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</Wrapper>
		);
	}
}

const Wrapper = styled.div`
	width: 324px;
	height: 934px;
	box-shadow: 7px 7px 8px 0 rgba(0, 0, 0, 0.5);
	background-color: ${DUSK};
`;
