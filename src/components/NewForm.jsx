import React, { Component } from "react";
// import { Link } from "react-router-dom";
export default class NewForm extends Component {
	state = {
		data: {
			title: "",
			genre: "",
			stock: "",
			rate: "",
		},
	};

	handleChange = (e) => {
		let id = e.currentTarget.id;
		let value = e.target.value;
		let newState = { ...this.state.data };
		newState[id] = value;
		this.setState({
			data: newState,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addMovie(this.state.data);
        alert("Movie added Successfully")
	};

	render() {
		let { title, genre, stock, rate } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div class="mb-3">
					<label class="form-label">
						Title:
						<input
							type="text"
							class="form-control"
							id="title"
							value={title}
							onChange={this.handleChange}
						/>
					</label>
				</div>
				<div class="mb-3">
					<label class="form-label">
						Genre:
						<select
							class="form-control"
							id="genre"
							value={genre}
							onChange={this.handleChange}
						>
							<option value="Action">Action</option>
							<option value="Thriller">Thriller</option>
							<option value="Comedy">Comedy</option>
						</select>
					</label>
				</div>
				<div class="mb-3">
					<label class="form-label">
						Stock:
						<input
							type="number"
							id="stock"
							class="form-control"
							value={stock}
							onChange={this.handleChange}
						/>
					</label>
				</div>
				<div class="mb-3">
					<label class="form-label">
						Rate:
						<input
							type="number"
							id="rate"
							class="form-control"
							value={rate}
							onChange={this.handleChange}
						/>
					</label>
				</div>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
