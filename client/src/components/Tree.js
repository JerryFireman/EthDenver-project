import React, { Component } from 'react';
import 'treeflex/dist/css/treeflex.css';
import { connect } from 'react-redux';

class Tree extends Component {
	state = {
		groupNumber: 0
	};

	componentDidUpdate(prevProps) {
		const { web3, groups } = this.props;
		// Typical usage (don't forget to compare props):
		if ((!prevProps.web3 && web3) || prevProps.groups !== groups) {
			console.log('readgroup!!!');
			this.readGroup();
			this.readMemberListInGroup();
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

		const { accounts, contract } = this.props;
		const response = await contract.methods.readMember(this.state.input).call();

		this.setState({ member: response });
	};

	readMemberListInGroup = async () => {
		const { accounts, contract } = this.props;
		const response = await contract.methods.readMemberListInGroup(this.state.groupNumber).call();

		this.setState({ groupMembers: response });
		console.log('tree member in group!', response);
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
		contract: state.common.contract,
		groups: state.common.groups
	};
};

export default connect(mapStateToProps, null)(Tree);
