import React, { Component } from "react";
import "../route.css";
import "./Home.css";

import InfoBubble from "../../components/InfoBubble/InfoBubble";

class Home extends Component {
	state = {
		joke: null
	};

	componentDidMount() {
		this.getMessage();
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

	render() {
		return (
			<div className="Home route">
				<h1>Home</h1>
				<div className="bubbles">
					<InfoBubble show={this.state.joke} width="100" height="250" color="#C7CEEA">
						<div className="title-bubble">
							<h1>{this.getTime()} Mum!</h1>
							<p>{this.state.joke}</p>
						</div>
					</InfoBubble>
				</div>
				<h2>More to come...</h2>
			</div>
		);
	}
}

export default Home;
