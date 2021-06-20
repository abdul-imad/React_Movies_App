import React, { Component } from "react";
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
				</label></div>
				<label>
					Genre:
					<select id="genre" value={genre} onChange={this.handleChange}>
						<option value="Action">Action</option>
						<option value="Thriller">Thriller</option>
						<option value="Comedy">Comedy</option>
					</select>
				</label>
				<label>
					Stock:
					<input
						type="number"
						id="stock"
						value={stock}
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Rate:
					<input
						type="number"
						id="rate"
						value={rate}
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
