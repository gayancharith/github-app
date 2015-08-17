var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var helpers = require('../utils/helpers');

var Profile = React.createClass({
	mixins: [Router.State, ReactFireMixin],
	getInitialState: function() {
		return {
			bio: {},
			notes: [],
			repos: []
		}
	},

	init: function() {
		var childRef = this.ref.child(this.getParams().username);
		this.bindAsArray(childRef, 'notes');

		helpers.getGithubInfo(this.getParams().username)
			.then(function(dataObj) {
				this.setState({
					bio: dataObj.bio,
					repos: dataObj.repos
				})
			}.bind(this));
	},

	componentDidMount: function() {
		console.log(this.getParams().username);
		this.ref = new Firebase("https://radiant-heat-7426.firebaseio.com");
		this.init();
	},

	componentWillReceiveProps: function() {
		this.unbind('notes');
		this.init();
	},

	componentWillUnmount: function() {
		this.unbind('notes');
	},

	handleAddNote: function(newNote) {
		console.log(typeof(newNote) + ' > ' + newNote);
		// var newNotes = this.state.notes.concat([newNote]);
		// console.log(newNotes);
		this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
		console.log(this.state.notes);
	},

	render: function() {
		var username = this.getParams().username;
		return (
			<div className="row">
				<div className="col-md-4">
					<UserProfile username={username} bio={this.state.bio} />
				</div>
				<div className="col-md-4">
					<Repos username={username} repos={this.state.repos}/>
				</div>
				<div className="col-md-4">
					<Notes
						username={username}
						notes={this.state.notes}
						addNote={this.handleAddNote}
					/>
				</div>
			</div>
		);
	}
});

module.exports = Profile;