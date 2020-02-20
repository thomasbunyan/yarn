import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

class Sidebar extends Component {
	state = {
		expandSideBar: false,
		currentPage: "/"
	};

	toggleSideBar = () => {
		this.setState({ expandSideBar: !this.state.expandSideBar }, () => {});
	};

	handlePageNav = (dest) => {
		this.setState({ currentPage: dest });
	};

	render() {
		return (
			<div className={"sidebar" + (this.state.expandSideBar ? " expanded" : "")}>
				<div className="right-bar"></div>
				<ul className={this.state.expandSideBar ? "buttons-expanded" : ""}>
					<li className="toggle-sidebar" onClick={this.toggleSideBar}>
						<i className="fas fa-bars"></i>
					</li>
					<Link to="/" onClick={() => this.handlePageNav("/")} className={this.state.currentPage === "/" ? "page-selected" : ""}>
						<li>
							<div>
								<p className={"icon-label" + (this.state.expandSideBar ? " icon-label-expand" : "")}>Home</p>
								<i className="fas fa-home"></i>
							</div>
						</li>
					</Link>
					<Link to="/convert" onClick={() => this.handlePageNav("/convert")} className={this.state.currentPage === "/convert" ? "page-selected" : ""}>
						<li>
							<div>
								<p className={"icon-label" + (this.state.expandSideBar ? " icon-label-expand" : "")}>Convert</p>
								<i class="fas fa-exchange-alt"></i>
							</div>
						</li>
					</Link>
				</ul>
			</div>
		);
	}
}

export default Sidebar;
