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
export default class Sidebar extends Component {
	render() {
		return (
			<Wrapper>
				<List>
					{[
						{ text: 'Create New Groups', icon: <GroupIcon /> },
						{ text: 'Create Vote', icon: <AddCircleIcon /> },
						{ text: 'Vote', icon: <CreateIcon /> }
					].map((item, index) => (
						<ListItem button key={item.text}>
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
