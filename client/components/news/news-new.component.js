'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions');

var d = new Date();

var newsEntry = React.createClass({
	addNewsEntry: function(event) {
		event.preventDefault();
		if (this.refs.title.value && this.refs.content.value) {
			this.props.dispatch(newsActions.addNewsEntry(this.refs.title.value, this.refs.content.value, this.props.entriesAmount, this.props.currentPage));
			this.refs.title.value = '';
			this.refs.content.value = '';
		}
	},
	createMarkup: function() {
		return {__html: this.refs.content.value || 'none'};
	},
	render: function() {
		return (
			<div className="news-entry-new">
				<form onSubmit={this.addNewsEntry} className="add-news-entry">
					<div className="admin">
						<div>
							Title:<input type="text" ref="title" />
							<p>Date</p>
						</div>
						Content:<textarea ref="content" />
						<div>
							<input type="submit" value="ADD" />
						</div>
					</div>
				</form>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		currentPage: state.news.currentPage,
		entriesAmount: state.news.entriesAmount
	};
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;