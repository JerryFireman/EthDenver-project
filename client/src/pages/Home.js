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
	DARK_RED
} from '../constant';
import Button from '../components/Button';

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
	render() {
		return (
			<Container>
				<Title>test title</Title>
			</Container>
		);
	}
}

const RedText = styled.div`
	color: ${DARK_RED};
	height: 80px;
	padding-top: 20px;
	box-sizing: border-box;
`;
const Input = styled.input`
	width: 200px;
	height: 50px;
	border-radius: 38px;
	background-color: ${DARK_GREY2};
	font-size: ${LARGE};
	color: white;
	border: none;
	text-align: center;
	margin: 75px 0 10px 0;
	::placeholder {
		color: ${GREYISH_BROWN};
	}
	&:focus {
		outline: none;
	}
`;
const Image = styled.img`
	height: 40px;
	margin: 50px;
`;
const Text = styled.div`
	max-width: 520px;
	width: 80%;
	font-size: ${MEDIUM};
	color: #7f7f7f;
	margin: 40px 20px;
	color: ${BROWN_GREY};
	display: flex;
	align-items: center;
`;
const SeedLength = styled.div`
	font-size: ${(props) => (props.active ? HUGE : EXTRA_LARGE)};
	color: ${(props) => (props.active ? 'white' : '#6d7278')};
	justify-content: center;
	display: flex;
	cursor: pointer;
	margin: 10px;
`;
const SeedLengthWrapper = styled.div`
	margin-top: 50px;
	align-items: center;
	justify-content: center;
	height: 40px;
	margin-bottom: 20px;
	display: flex;
`;
const LengthButton = styled.div`
	margin: 25px;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	display: flex;
`;
const NavigationButton = styled.div`
	width: 288px;
	height: 54px;
	border-radius: 27px;
	background-color: ${(props) => (props.active ? DARK_GREY3 : DARK_GREY)};
	color: ${(props) => (props.active ? LIGHT_YELLOW : BROWN_GREY)};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: ${(props) => props.active && 'solid 1px rgb(51, 51, 51)'};
	box-shadow: ${(props) => props.active && 'rgba(0, 0, 0, 0.05) 0px 4px 8px 0px'};
	&:hover {
		color: ${ORANGEY_YELLOW};
		background-color: ${(props) => (props.active ? DARK_GREY2 : DARK_GREY)};
	}
`;

const NavigationBar = styled.div`
	width: 100%;
	max-width: 577px;
	height: 54px;
	border-radius: 27px;
	background-color: ${DARK_GREY};
	display: flex;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 0px;
`;

const InfoBox = styled.textarea`
  font-size: ${LARGE}
	max-width: 577px;
	height: 140px;
	width: 100%;
	border-radius: 5px;
	border: solid 1px rgb(51, 51, 51);
	background-color: #202124;
	line-height: 1.64;
	color: white;
	padding: 20px;
	box-sizing: border-box;
	border-radius: 23px;
	resize: none;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 0px;
	&:focus {
		outline: none;
		border: solid 1px ${(props) => (props.isFormatValidated ? ORANGEY_YELLOW : DARK_RED)} ;
	}
	::placeholder {
		color: ${GREYISH_BROWN};
		font-size: ${SMALL};
	}
`;
const Container = styled.div`
	max-width: 604px;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-flow: column;
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
