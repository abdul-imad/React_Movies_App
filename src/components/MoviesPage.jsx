import React, { Component } from "react";
import { Link } from "react-router-dom";
import GenreList from "./GenreList";
import Pagination from "./Pagination";

export default class MoviesPage extends Component {
	state = {
		genres: [{ _id: 123456, name: "All Genres" }],
		currSearchText: "",
		pageNum: 1,
		limit: 4,
		currGenre: "All Genres",
	};

	searchMovie = (e) => {
		let text = e.target.value;
		this.setState({
			currSearchText: text,
			pageNum: 1,
		});
	};

	changeLimit = (e) => {
		let userLimit = e.target.value;
		console.log(userLimit);
		this.setState({
			limit: userLimit,
			pageNum: 1,
		});
	};

	changeActivePageBtn = (pageNum) => {
		this.setState({
			pageNum: pageNum,
		});
	};
	sortByGenre = (genre) => {
		this.setState({
			currGenre: genre,
			pageNum: 1,
		});
	};

	async componentDidMount() {
		// backend call for genres
		let genreResp = await fetch(
			"https://react-backend101.herokuapp.com/genres"
		);
		let backEndGenres = await genreResp.json();
		this.setState({
			genres: [...this.state.genres, ...backEndGenres.genres],
		});
	}

	render() {
		let { genres, currGenre, currSearchText, pageNum, limit } = this.state;
		let { movies, deleteMovie } = this.props;
		// filtering movies based on search
		let filteredArr = movies.filter((movieObj) => {
			let title = movieObj.title.trim().toLowerCase();
			return title.startsWith(currSearchText);
		});
		if (currSearchText === "") {
			filteredArr = movies;
		}

		// showing movies of clicked genre
		if (currGenre !== "All Genres") {
			filteredArr = movies.filter((movieObj) => {
				return movieObj.genre.name === currGenre;
			});
		}
		// pagination
		if (limit <= 0) {
			limit = 1;
		}
		let totalPages = Math.ceil(filteredArr.length / limit);
		filteredArr = filteredArr.slice((pageNum - 1) * limit, pageNum * limit);

		return (
			<div className="row">
				{/* Genres */}
				<div className="col-lg-2">
					{/* genre Component */}
					<GenreList
						genres={genres}
						sortByGenre={this.sortByGenre}
						currGenre={currGenre}
					></GenreList>
				</div>

				{/* space between genres and movies col */}
				<div className="col-lg-1"></div>

				{/* movies */}
				<div className="col-lg-9">
					<Link className="text-light" to="/new">
						<button className="btn btn-primary">New</button>
					</Link>
					<input
						type="search"
						placeholder="Search any movie"
						value={currSearchText}
						onChange={this.searchMovie}
					/>
					<input
						type="number"
						placeholder="No. of rows"
						value={limit}
						contentEditable="false"
						min="1"
						max={movies.length}
						onChange={this.changeLimit}
					/>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Title</th>
								<th scope="col">Genre</th>
								<th scope="col">Stock</th>
								<th scope="col">Rate</th>
							</tr>
						</thead>
						<tbody>
							{filteredArr.map((movieObj) => {
								return (
									<tr key={movieObj._id}>
										<td></td>
										<td>{movieObj.title}</td>
										<td>{movieObj.genre.name.trim()}</td>
										<td>{movieObj.numberInStock}</td>
										<td>{movieObj.dailyRentalRate}</td>
										<td>
											<button
												type="button"
												className="btn btn-danger"
												onClick={() => deleteMovie(movieObj._id)}
											>
												Delete{" "}
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{/* pagination Component */}
					<Pagination
						totalPages={totalPages}
						changeActivePageBtn={this.changeActivePageBtn}
						pageNum={pageNum}
					></Pagination>
				</div>
			</div>
		);
	}
}
