import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

class Sidebar extends Component {
	state = {
		expandSideBar: false
	};

	toggleSideBar = () => {
		this.setState({ expandSideBar: !this.state.expandSideBar }, () => {});
	};

	route = (route) => {
		console.log(route);
	};

	render() {
		return (
			<div className={"sidebar" + (this.state.expandSideBar ? " expanded" : "")}>
				<ul className="noselect">
					<li className="toggle-sidebar" onClick={this.toggleSideBar}>
						<i className="fas fa-bars"></i>
					</li>
					<Link to="/">
						<li>
							<i className="fas fa-home"></i>
						</li>
					</Link>
					<Link to="/convert">
						<li>
							<i className="fas fa-balance-scale"></i>
						</li>
					</Link>
				</ul>
			</div>
		);
	}
}

export default Sidebar;
