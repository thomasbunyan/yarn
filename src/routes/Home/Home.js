import React, { Component } from "react";
import "../route.css";
import "./Home.css";
import yarnImg from "../../assets/images/yarn-img.png";

import InfoBubble from "../../components/InfoBubble/InfoBubble";

class Home extends Component {
	state = {
		joke: null
	};

	componentDidMount() {
		this.getMessage();
		console.log("loaded");
	}

	getTime = () => {
		let time = new Date().getHours();
		if (time >= 5 && time < 12) {
			return "Morning";
		} else if (time >= 12 && time < 19) {
			return "Afternoon";
		} else if (time >= 19 && time < 23) {
			return "Evening";
		} else {
			return "SLEEP";
		}
	};

	getMessage = () => {
		fetch("https://icanhazdadjoke.com/", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})
			.then((res) => res.json())
			.then((result) => {
				this.setState({ joke: result.joke });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ joke: "Error" });
			});
	};

	getDates = () => {
		let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
		let d = new Date();
		let d2 = new Date();
		let dates = [];
		for (let i = 0, day = -3; i < 7; i++, day++) {
			d.setDate(d2.getDate() + day);
			dates.push(
				<div className={"date" + (day === 0 ? " current-date" : "")} key={i}>
					<div>{days[d.getDay()]}</div>
					<div>{d.getDate()}</div>
				</div>
			);
		}
		return dates;
	};

	render() {
		return (
			<div className="Home route">
				<h1>Home</h1>
				<div className="bubbles">
					<InfoBubble show={this.state.joke} width="100" color="#C7CEEA">
						<div className="title-bubble">
							<div className="title-bubble-left">
								<h1>{this.getTime()} Mum!</h1>
								<p>{this.state.joke}</p>
							</div>
							<div className="title-bubble-right">
								<img src={yarnImg} alt="Yarn" />
							</div>
						</div>
					</InfoBubble>
					<div className="location-bar">
						<h3>Location-o-metre</h3>
						<div className="bar-icons">
							<i className="fas fa-home"></i>
							<i class="fas fa-building"></i>
						</div>
						<div className="distance-bar">
							<div className="progress-dot"></div>
							<div className="progress-dot dot-2"></div>
							<div className="progress-bar">
								<div className="progress">
									<i class="fas fa-flag"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="date-area">{this.getDates()}</div>
			</div>
		);
	}
}

export default Home;
