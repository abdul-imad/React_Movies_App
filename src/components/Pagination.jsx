import React,{Component} from "react";
export default class Pagination extends Component {
	render() {
		let { pageNum, changeActivePageBtn, totalPages } = this.props;
		let pagesArr = [];
		for (let i = 0; i < totalPages; i++) {
			pagesArr.push(i + 1);
		}
		return (
			<nav aria-label="...">
				<ul className="pagination">
					{pagesArr.map((eachPage) => {
						return eachPage === pageNum ? (
							<li
								key={eachPage}
								className="page-item active"
								onClick={() => changeActivePageBtn(eachPage)}
							>
								<a className="page-link" href>
									{eachPage}
								</a>
							</li>
						) : (
							<li
								className="page-item"
								onClick={() => changeActivePageBtn(eachPage)}
							>
								<a className="page-link" href>
									{eachPage}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}
}


