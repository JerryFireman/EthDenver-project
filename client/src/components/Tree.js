import React, { Component } from 'react';
import 'treeflex/dist/css/treeflex.css';
import { connect } from 'react-redux';

class Tree extends Component {
	componentDidMount = () => {
		const { web3 } = this.props;
		console.log('web3 tree', web3);
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

const mapStateToProps = (state) => ({
	web3: state.common.web3
});

export default connect(mapStateToProps, null)(Tree);
