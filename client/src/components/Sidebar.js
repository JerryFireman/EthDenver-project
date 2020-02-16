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
import ChatBox from '3box-chatbox-react';
import { Route } from "react-router-dom";
import Box from "3box";

export default class Sidebar extends Component {
	state = {
		isCreateGroupModalOpen: true,
		needToAWeb3Browser: false
	};
	doSomething = () => {
		this.setState({ isCreateGroupModalOpen: true });
	};
	onClose = () => {
		this.setState({ isCreateGroupModalOpen: false });
	};

	async getAddressFromMetaMask() {
		if (typeof window.ethereum == "undefined") {
		  this.setState({ needToAWeb3Browser: true });
		} else {
		  window.ethereum.autoRefreshOnNetworkChange = false;
		  const accounts = await window.ethereum.enable();
		  this.setState({ accounts });
		}
	  }

	async componentDidMount() {
		await this.getAddressFromMetaMask();
		if (this.state.accounts) {
		  const box = await Box.openBox(this.state.accounts[0], window.ethereum);
		  const space = await box.openSpace("test");
		  this.setState({ box });
		  this.setState({ space });
		  await box.syncDone;
		  await space.syncDone;
		  console.log("3Box synced");
		}
	}

	//closeModal, showModal, action, message, title, disableBackdropClick
	render() {
		const { isCreateGroupModalOpen } = this.state;
		return (
			<Wrapper>
				<CreateNewGroupModal showModal={isCreateGroupModalOpen} closeModal={this.onClose} />
				<List>
					{[
						{ text: 'Create New Groups', icon: <GroupIcon /> },
						{ text: 'Create Vote', icon: <AddCircleIcon /> },
						{ text: 'Vote', icon: <CreateIcon /> },
					].map((item, index) => (
						<ListItem onClick={this.doSomething} button key={item.text}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
				<Route>
					{this.state.box && <ChatBox
					spaceName="testingnov"
					threadName="testingnovthread"
					box={this.state.box}
					currentUserAddr={this.state.accounts[0]}
					mute={false}
					popupChat
					showEmoji
					colorTheme="#181F21"/>}
				</Route>
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
