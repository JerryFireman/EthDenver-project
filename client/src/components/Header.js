import React, { Component } from 'react';
import styled from 'styled-components';
import { DUSK } from '../Utils/constant';
import ProfileHover from 'profile-hover';

export const HEADER_HEIGHT = 74;

export default class Header extends Component {
	render() {
		return <HeaderContainer>DAOmocracy<span>&nbsp;&nbsp;</span>
				<ProfileHover address={'0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d0'} tileStyle={false}/></HeaderContainer>
	}
}

const HeaderContainer = styled.div`
	position: relative;
	background: ${DUSK};
	display: flex;
	height: ${HEADER_HEIGHT}px;
	align-items: center;
	padding-left: 20px;
	box-shadow: 0 7px 8px 0 rgba(0, 0, 0, 0.5);
	color: white;
	z-index: 1000;
`;

const Image = styled.img`width: 100px;`;
