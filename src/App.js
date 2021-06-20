import React, { Component } from "react";
import "./App.css";
import MoviesPage from "./components/MoviesPage";
import NewForm from "./components/NewForm";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";

export default class App extends Component {
	state = {
		movies: [],
	};
	deleteMovie = (id) => {
		let currentMovieArr = this.state.movies.filter((movieObj) => {
			return movieObj._id !== id;
		});
		this.setState({
			movies: currentMovieArr,
		});
	};

	async componentDidMount() {
		// backend call for movies
		let resp = await fetch("https://react-backend101.herokuapp.com/movies");
		let backEndMovies = await resp.json();
		this.setState({
			movies: backEndMovies.movies,
		});
	}

	addMovie = (dataObj) => {
		let { title, genre, stock, rate } = dataObj;
		let genreObj = [
			{ _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
			{ _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
			{ _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
		];

		for (let i = 0; i < genreObj.length; i++) {
			if (genre === genreObj[i].name) {
				genre = genreObj[i];
			}
		}
		let newMovieObj = {
			_id: Date.now(),
			title: title,
			genre: genre,
			dailyRentalRate: rate,
			numberInStock: stock,
		};
		let copyMovies = [...this.state.movies, newMovieObj];

		this.setState({
			movies: copyMovies,
		});
	};
	render() {
		return (
			<>
				<Navbar />

				<Switch>
					<Route
						path="/new"
						render={(props) => {
							return <NewForm {...props} addMovie={this.addMovie}></NewForm>;
						}}
					></Route>
					<Route path="/login" component={Login}></Route>
					<Route
						path="/"
						render={(props) => {
							return (
								<MoviesPage
									{...props}
									movies={this.state.movies}
									deleteMovie={this.deleteMovie}
								></MoviesPage>
							);
						}}
					></Route>
				</Switch>
			</>
		);
	}
}
