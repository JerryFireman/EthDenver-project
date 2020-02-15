import React, { Component } from 'react';
import styled from 'styled-components';

export const HEADER_HEIGHT = 74;

export default class Header extends Component {
	render() {
		return (
			<HeaderContainer>
				<Image alt="img" src={'CWS_Logo.png'} />
			</HeaderContainer>
		);
	}
}

const HeaderContainer = styled.div`
	background: #333639;
	display: flex;
	height: ${HEADER_HEIGHT}px;
	align-items: center;
	padding-left: 20px;
`;

const Image = styled.img`width: 100px;`;
