import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import {
	BROWN_GREY,
	DARK_GREY,
	ORANGEY_YELLOW,
	DARK_GREY2,
	GREYISH_BROWN,
	LIGHT_YELLOW,
	DARK_GREY3,
	LARGE,
	MEDIUM,
	HUGE,
	EXTRA_LARGE,
	SMALL,
	DARK_RED,
	DARK_BLUE
} from '../Utils/constant';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Tree from '../components/Tree';

const themeDarkGray = {
	button: {
		background: '#212529',
		color: GREYISH_BROWN,
		hoverBackground: '#212529',
		hoverColor: GREYISH_BROWN,
		cursor: 'default'
	}
};

const main = {
	button: {
		background: ORANGEY_YELLOW,
		color: 'white',
		hoverBackground: LIGHT_YELLOW,
		hoverColor: 'white'
	}
};

export default class Home extends Component {
	state = {
		groupArray: [ '' ],
		treeGroup: [ '' ]
	};

	componentDidMount = async () => {

			console.log(this.state.groupArray);
			console.log(this.state.treeGroup);
	};

	render() {
		return (
			<Fragment>
				<Header />
				<Container>
					<Sidebar treeGroup={this.state.treeGroup} groupArray={this.state.groupArray}/>
					<Tree treeGroup={this.state.treeGroup} groupArray={this.state.groupArray}/>
				</Container>
			</Fragment>
		);
	}
}

const Container = styled.div`
	width: 100%;
	background: ${DARK_BLUE};
	display: flex;
`;
const Text2 = styled.div`
	height: 82px;
	font-size: ${SMALL};
	line-height: 1.64;
	color: ${BROWN_GREY};
`;
const Title = styled.div`
	margin: 30px
	font-size: ${EXTRA_LARGE};
	color: #7f7f7f;
	display: flex;
	justify-content: center;
	align-items: center;
	justify-content: space-between;
	width: 230px;
`;
