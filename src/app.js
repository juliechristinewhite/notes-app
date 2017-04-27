import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard.js';

const config = {
    apiKey: "AIzaSyD4YuQMta78eU7U4AYx3qVH0wLkQ9igYrw",
    authDomain: "notes-af553.firebaseapp.com",
    databaseURL: "https://notes-af553.firebaseio.com",
    projectId: "notes-af553",
    storageBucket: "notes-af553.appspot.com",
    messagingSenderId: "710076026078"
};
firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			notes: []
		}
		this.showSidebar = this.showSidebar.bind(this);
		this.addNote = this.addNote.bind(this);
	}
	componentDidMount() {
		firebase.database().ref().on('value', (res) => {
			const userData = res.val();
			const dataArray = [];
			for(let objectKey in userData) {
				userData[objectKey].key = objectKey;
				dataArray.push(userData[objectKey]);
			}
			this.setState({
				notes: dataArray
			})
		});
	}
	showSidebar(e) {
		e.preventDefault();
		this.sidebar.classList.toggle("show");
	}
	addNote(e) {
		e.preventDefault();
		console.log("submitted");
		const note = {
			title: this.noteTitle.value,
			text: this.noteText.value
		};
		
		const dbRef = firebase.database().ref();

		dbRef.push(note);

		this.noteTitle.value = "";
		this.noteText.value = "";
		this.showSidebar(e);
	}
	removeNote(key) {
		console.log(key);
		const dbRef = firebase.database().ref(key);
		dbRef.remove();
	}
	render() {
		return (
			<div>
				<header className="mainHeader">
					<h1>Noted</h1>
					<nav>
						<a href="" onClick={this.showSidebar}>Add New Note</a>
					</nav>
				</header>
				<section className="notes">
					{this.state.notes.map((note,i) => {
						return (
							<NoteCard note={note} key={`note-${i}`} removeNote={this.removeNote}/>
						)
					})}
				</section>
				<aside className="sidebar" ref={ref => this.sidebar = ref}>
					<form onSubmit={this.addNote}>
						<h3>Add New Note</h3>
						<div className="close-btn" onClick={this.showSidebar}>
							<i className="fa fa-times"></i>
						</div>
						<label htmlFor='note-title'>Title:</label>
						<input type="text" name="note-title" ref={ref => this.noteTitle = ref} />
						<label htmlFor="note-text">Text:</label>
						<textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
						<input type="submit" value="Add New Note" />
					</form>
				</aside>
			</div>
		)
	}
}

ReactDom.render(<App/>,document.getElementById('app'));