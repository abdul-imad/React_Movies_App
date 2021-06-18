import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Routing from "./components/Routing";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Routing />
	</BrowserRouter>,
	document.getElementById("root")
);

reportWebVitals();
