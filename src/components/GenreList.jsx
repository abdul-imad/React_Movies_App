import React, { Component } from "react";
 export default class GenreList extends Component {
	render() {
		let { genres, sortByGenre, currGenre } = this.props;
		return (
			<ul className="list-group">
				{genres.map((genre) => {
					let genreClass =
						genre.name === currGenre
							? "list-group-item list-group-item-action active"
							: "list-group-item list-group-item-action";
					return (
						<li
							key={genre._id}
							className={genreClass}
							onClick={() => sortByGenre(genre.name)}
						>
							{genre.name}
						</li>
					);
				})}
			</ul>
		);
	}
}