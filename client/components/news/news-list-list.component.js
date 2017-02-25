'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	NewsEntry = require('./news-list-entry.component'),
	newsActions = require('../../actions/news.actions');

var newsEntryList = React.createClass({
	render: function() {
		var newsEntries = [];
		if (this.props.newsEntries) {
			for (var i = (0 + ((this.props.pageNumber - 1) * this.props.perPage)); (i < this.props.totalEntries && i < ((this.props.pageNumber) * this.props.perPage) - 1 ); i++) {
				newsEntries.push(<NewsEntry key={i} newsEntryNumber={i} />);
			}
		} else {
			var content = {
				idnews: 'noidnews',
				date_enter: 'nodate',
				title: 'No News',
				content: 'Please check back Later'
			};
			newsEntries.push(<NewsEntry key={0} newsEntry={content} />);
		}
		return (
			<ul className="news-entry-list">
				{newsEntries}
			</ul>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		newsEntries: state.news.newsEntries,
		totalEntries: state.news.totalEntries
	};
};

var Container = connect(mapStateToProps)(newsEntryList);

module.exports = Container;