import React, { Component } from 'react';
import 'treeflex/dist/css/treeflex.css';
export default class Tree extends Component {
	render() {
		return (
			<div>
				<div class="tf-tree">
					<ul>
						<li>
							<span class="tf-nc">1</span>
							<ul>
								<li>
									<span class="tf-nc">2</span>
								</li>
								<li>
									<span class="tf-nc">3</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
