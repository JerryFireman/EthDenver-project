import React, { Component } from 'react';
import styled from 'styled-components';

export default class Container extends Component {
	render() {
		return <ContainerMain>{this.props.children}</ContainerMain>;
	}
}

const ContainerMain = styled.div`
	width: 100%;
	background: #333639;
	position: absolute;
	display: flex;
	justify-content: center;
	height: 100%;
`;
