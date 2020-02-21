import React, { Component } from "react";
import "./Convert.css";
import "../route.css";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const units = {
	METRE: "m",
	CENTIMETRE: "cm",
	MILLIMETRE: "mm",
	YARD: "yd",
	FOOT: "ft",
	INCH: "in"
};

class Convert extends Component {
	state = {
		history: [],
		leftVal: 1,
		rightVal: 1,
		leftUnit: "METRE",
		rightUnit: "METRE"
	};

	handleInput = (e) => {
		e.preventDefault();
		let { name, value } = e.target;
		if (value === "") {
			value = 0;
		} else if (isNaN(value)) return;
		this.setState({ [name]: parseInt(value) }, () => {
			this.updateConversion(name);
		});
	};

	updateConversion = (name) => {
		console.log("Update", name);
		if (name === "leftVal") {
			this.convert(name, this.state.leftUnit, this.state.rightUnit, this.state.leftVal);
		} else {
			this.convert(name, this.state.rightUnit, this.state.leftUnit, this.state.rightVal);
		}
	};

	convert = (name, from, to, val) => {
		ipcRenderer.on("convert-unit-res", (event, arg) => {
			let { name, res } = arg;
			res = Math.round(res * 100) / 100;
			if (name === "leftVal") {
				this.setState({ rightVal: res });
			} else {
				this.setState({ leftVal: res });
			}
		});
		ipcRenderer.send("convert-unit-req", {
			name,
			from: units[from],
			to: units[to],
			val
		});
	};

	getUnitOptions = () => {
		let options = [];
		let index = 0;
		for (let unit in units) {
			options.push(
				<option key={index} value={unit}>
					{unit.toLowerCase()}
				</option>
			);
			index++;
		}
		return options;
	};

	handleUpdate = (e) => {
		let { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			console.log(name);
			if (name === "leftUnit") {
				this.updateConversion("rightVal");
			} else {
				this.updateConversion("leftVal");
			}
		});
	};

	saveResult = () => {
		if (this.state.leftVal !== "" && this.state.rightVal !== "") {
			const history = this.state.history;
			history.push({
				leftUnit: this.state.leftUnit,
				rightUnit: this.state.rightUnit,
				leftVal: this.state.leftVal,
				rightVal: this.state.rightVal
			});
			this.setState({ history });
		}
	};

	applySaved = (e) => {
		let target = this.state.history[e.target.getAttribute("data-key")];
		this.setState({
			leftVal: target.leftVal,
			rightVal: target.rightVal,
			leftUnit: target.leftUnit,
			rightUnit: target.rightUnit
		});
	};

	getHistory = () => {
		let index = -1;
		return this.state.history.map((item) => {
			index++;
			return (
				<div className="history-item" key={index} data-key={index} onClick={this.applySaved}>
					<div>
						{item.leftVal}
						{units[item.leftUnit]}
					</div>
					<div>=</div>
					<div>
						{item.rightVal}
						{units[item.rightUnit]}
					</div>
				</div>
			);
		});
	};

	resetResult = () => {
		this.setState({
			leftVal: 1,
			rightVal: 1,
			leftUnit: "METRE",
			rightUnit: "METRE"
		});
	};

	getConvertHeight = () => {
		let style = {};
		if (this.state.history.length > 0) {
			style["max-height"] = "300px";
			style["padding-top"] = "50px";
		}
		return style;
	};

	render() {
		return (
			<div className="Convert route">
				<h1>Convert</h1>
				<div className="conversion" style={this.getConvertHeight()}>
					<div className="conversion-module">
						<div className="conversion-bubble">
							<div className="con-value">
								<select name="leftUnit" onChange={this.handleUpdate} value={this.state.leftUnit}>
									{this.getUnitOptions()}
								</select>
								<input type="text" name="leftVal" onChange={this.handleInput} value={this.state.leftVal} />
							</div>
						</div>
						<div className="conversion-bubble">
							<div className="con-value">
								<select name="rightUnit" onChange={this.handleUpdate} value={this.state.rightUnit}>
									{this.getUnitOptions()}
								</select>
								<input type="text" name="rightVal" onChange={this.handleInput} value={this.state.rightVal} />
							</div>
						</div>
					</div>
					<div className="con-buttons">
						<i className="fas fa-save" onClick={this.saveResult}></i>
						<i className="fas fa-redo" onClick={this.resetResult}></i>
					</div>
				</div>
				{this.state.history.length > 0 ? (
					<div className="history">
						<h1>History</h1>
						<div className="history-grid">{this.getHistory()}</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default Convert;
