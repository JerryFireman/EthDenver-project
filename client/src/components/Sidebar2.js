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
import ChatBox from '3box-chatbox-react';
import { Route } from 'react-router-dom';
import Box from '3box';
import VoteModal from './VoteModal';
import { setupTab } from '../redux/actions';
import { connect } from 'react-redux';

class Sidebar2 extends Component {
	state = {
		activeIndex: 0,
		menu: [
			{ text: 'Create New Groups', icon: <GroupIcon />, isOpen: false },
			{ text: 'Create Vote', icon: <AddCircleIcon />, isOpen: false },
			{ text: 'Vote', icon: <CreateIcon />, isOpen: false }
		],
		needToAWeb3Browser: false
	};
	active = (index) => {
		const { menu } = this.state;
		let newMenu = menu;
		newMenu[index]['isOpen'] = true;
		this.setState({ menu: newMenu, activeIndex: index });
	};
	onClose = (index) => {
		const { menu } = this.state;
		let newMenu = menu;
		newMenu[index]['isOpen'] = false;
		this.setState({ menu: newMenu });
	};

	async getAddressFromMetaMask() {
		if (typeof window.ethereum == 'undefined') {
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
			const space = await box.openSpace('test');
			this.setState({ box });
			this.setState({ space });
			await box.syncDone;
			await space.syncDone;
			console.log('3Box synced');
		}
	}
	closeCreateVote = () => {
		this.onClose(1);
	};
	closeCreateVoteModal = () => {
		this.onClose(2);
	};

	render() {
		const { menu, activeIndex } = this.state;
		const { setupTab } = this.props;
		return (
			<Wrapper>
				<List>
					{menu.map((item, index) => (
						<ListItem key={item.text} onClick={() => setupTab(index)} button key={item.text}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
				<Route>
					{this.state.box && (
						<ChatBox
							spaceName="testingnov"
							threadName="testingnovthread"
							box={this.state.box}
							currentUserAddr={this.state.accounts[0]}
							mute={false}
							popupChat
							showEmoji
							colorTheme="#181F21"
						/>
					)}
				</Route>
			</Wrapper>
		);
	}
}

const mapDispatchToProps = {
	setupTab
};

export default connect(null, mapDispatchToProps)(Sidebar2);

const Wrapper = styled.div`
	width: 324px;
	height: 934px;
	box-shadow: 7px 7px 8px 0 rgba(0, 0, 0, 0.5);
	background-color: ${DUSK};
`;
