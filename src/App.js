import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./routes/Home/Home";
import Convert from "./routes/Convert/Convert";

function App() {
	return (
		<div className="app">
			<Router>
				<Sidebar className="SideBar" />
				<Switch className="Switch">
					<Route path="/" exact component={Home} />
					<Route path="/convert" exact component={Convert} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
