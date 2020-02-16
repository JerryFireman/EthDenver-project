import React, { Component } from 'react';
import styled from 'styled-components';
import { ORANGEY_YELLOW, SMALL, DUSK } from '../Utils/constant';

export default class Button extends Component {
	render() {
		const { fontSize, handleOnClick, width, theme, blue } = this.props;
		return (
			<ButtonBase blue={blue} theme={theme} width={width} onClick={handleOnClick}>
				<Text fontSize={fontSize}>{this.props.label}</Text>
			</ButtonBase>
		);
	}
}

const ButtonBase = styled.div`
	width: 200px;
	height: 50px;
	border-radius: 8px;
	box-shadow: 0 7px 8px 0 rgba(0, 0, 0, 0.5);
	background-image: ${(props) => (props.blue ? '#23BFE3' : `linear-gradient(to bottom, #7689a9, ${DUSK})`)};
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	cursor: pointer;
`;

const Text = styled.div`font-size: ${(props) => (props.fontSize ? props.fontSize : SMALL)};`;
