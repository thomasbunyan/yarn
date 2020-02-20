import React, { Component } from "react";
import "./InfoBubble.css";

class InfoBubble extends Component {
	getStyle = () => {
		let style = {
			width: this.props.width + "%",
			height: this.props.height + "px",
			backgroundColor: this.props.color,
			opacity: 0,
			maxHeight: 0
		};
		if (this.props.show) {
			style.opacity = 1;
			style.maxHeight = 1000 + "px";
		}
		return style;
	};

	render() {
		return (
			<div className={"InfoBubble" + (this.props.noPadding ? " no-padding" : "")} style={this.getStyle()}>
				{this.props.children}
			</div>
		);
	}
}

export default InfoBubble;
