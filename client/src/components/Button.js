import React, { Component } from 'react';
import styled from 'styled-components';
import { ORANGEY_YELLOW, SMALL, DUSK } from '../Utils/constant';

export default class Button extends Component {
	render() {
		const { fontSize, handleOnClick, width, theme } = this.props;
		return (
			<ButtonBase theme={theme} width={width} onClick={handleOnClick}>
				<Text fontSize={fontSize}>{this.props.label}</Text>
			</ButtonBase>
		);
	}
}

const ButtonBase = styled.div`
	width: 313px;
	height: 77px;
	border-radius: 8px;
	box-shadow: 0 7px 8px 0 rgba(0, 0, 0, 0.5);
	background-image: linear-gradient(to bottom, #7689a9, ${DUSK});
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
`;

const ButtonMain = styled(ButtonBase)`
	cursor: ${(props) => (props.theme.button.cursor ? props.theme.button.cursor : 'pointer')};
	max-width: ${(props) => (props.width ? `${props.width}px` : '320px')};
	border: ${(props) => (props.theme.button.borderColor ? `solid 1px ${props.theme.button.borderColor}` : 'none')};
	background-color: ${(props) => props.theme.button.background};
	color: ${(props) => props.theme.button.color};
	&:hover {
		border-color: #f09307;
		background-color: ${(props) => props.theme.button.hoverBackground};
		color: ${(props) => props.theme.button.hoverColor};
	}
`;

ButtonMain.defaultProps = {
	theme: {
		button: {
			borderColor: ORANGEY_YELLOW,
			background: '#212529',
			color: ORANGEY_YELLOW,
			hoverBackground: '#212529',
			hoverColor: ORANGEY_YELLOW
		}
	}
};

const Text = styled.div`font-size: ${(props) => (props.fontSize ? props.fontSize : SMALL)};`;
