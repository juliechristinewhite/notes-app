import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
	render() {
		return (
			<div>
				<header className="mainHeader">
					<h1>Noted</h1>
					<nav>
						<a href="">Add New Note</a>
					</nav>
				</header>
				<section className="notes">
					<div className="noteCard">
						<i className="fa fa-edit"></i>
						<i className="fa fa-times"></i>
						<h4>Title</h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum sapiente, rerum praesentium deleniti quo veritatis atque. Fugiat, voluptatum quis. Consequatur quae deserunt recusandae, amet culpa iste dolorem iure distinctio optio!</p>
					</div>
				</section>
				<aside className="sidebar">
					<form>
						<h3>Add New Note</h3>
						<div className="close-btn">
							<i className="fa fa-times"></i>
						</div>
						<label htmlFor='note-title'>Title:</label>
						<input type="text" name="note-title" />
						<label htmlFor="note-text">Text:</label>
						<textarea name="note-text"></textarea>
						<input type="submit" value="Add New Note" />
					</form>
				</aside>

			</div>
		)
	}
}

ReactDom.render(<App/>,document.getElementById('app'));