import "./App.css";
import MoviesPage from "./components/MoviesPage";
import NewForm from "./components/NewForm";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";

function App() {
	return (
		<>
			<Navbar />

			<Switch>
				<Route path="/new" component={NewForm}></Route>
				<Route path="/login" component={Login}></Route>
				<Route path="/" component={MoviesPage}></Route>
			</Switch>
		</>
	);
}

export default App;
