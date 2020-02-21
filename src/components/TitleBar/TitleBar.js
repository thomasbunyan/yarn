import React, { Component } from "react";
import "./TitleBar.css";
const electron = window.require("electron");
const remote = electron.remote;

class TitleBar extends Component {
	closeWindow = () => {
		let window = remote.getCurrentWindow();
		window.close();
	};

	render() {
		return (
			<div className="TitleBar">
				<div className="left drag"></div>
				<div className="middle drag"></div>
				<div className="right">
					<i class="fas fa-times"></i>
				</div>
			</div>
		);
	}
}

export default TitleBar;
