import React, { Component } from 'react';
import 'treeflex/dist/css/treeflex.css';
import { connect } from 'react-redux';

class Tree extends Component {
	state = {
		groupNumber: 0
	};
	// componentDidMount = () => {
	// 	const { web3 } = this.props;
	// 	console.log('web3 tree', web3);
	// 	this.readGroup();
	// };

	componentDidUpdate(prevProps) {
		const { web3 } = this.props;
		// Typical usage (don't forget to compare props):
		if (web3) {
			console.log('readgroup!!!');
			this.readGroup();
		}
	}

	readGroup = async () => {
		// event.preventDefault();

		const { accounts, contract } = this.props;
		const response = await contract.methods.readGroup(this.state.groupNumber).call();
		console.log('tree group!', response);
	};

	readMember = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.props.common;
		const response = await contract.methods.readMember(this.state.input).call();

		this.setState({ member: response });
	};

	readMemberListInGroup = async (event) => {
		event.preventDefault();

		const { accounts, contract } = this.props.common;
		const response = await contract.methods.readMemberListInGroup(this.state.input).call();

		this.setState({ groupMembers: response });
	};
	render() {
		return (
			<div>
				<div className="tf-tree">
					<ul>
						<li>
							<span className="tf-nc">1</span>
							<ul>
								<li>
									<span className="tf-nc">2</span>
								</li>
								<li>
									<span className="tf-nc">3</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		web3: state.common.web3,
		accounts: state.common.accounts,
		contract: state.common.contract
	};
};

export default connect(mapStateToProps, null)(Tree);
