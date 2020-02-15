import React, { Component } from 'react';
import styled from 'styled-components';
import { DUSK } from '../Utils/constant';

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
	background: ${DUSK};
	display: flex;
	height: ${HEADER_HEIGHT}px;
	align-items: center;
	padding-left: 20px;
	box-shadow: 0 7px 8px 0 rgba(0, 0, 0, 0.5);
`;

const Image = styled.img`width: 100px;`;
