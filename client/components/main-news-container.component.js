'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	NewsEntriesList = require('./news/news-list-list.component'),
	newsActions = require('../actions/news.actions'),
	appConfig = require('../app.cfg');

var newsEntriesContainer = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsEntries(appConfig.MAIN_NEWS_COUNT, 1));
	},
	componentDidUpdate: function() {
		this.props.dispatch(newsActions.getNewsEntries(appConfig.MAIN_NEWS_COUNT, 1));
	},
	render: function() {
		return (
			<div className="news-entries-container">
				<div className="container">
					<Link to={'/news'} ><h2>NEWS</h2></Link>
		    	</div>
		    	<div className="container">
					<NewsEntriesList pageNumber={1} perPage={(appConfig.MAIN_NEWS_COUNT + 1)} />
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		entriesAmount: state.news.entriesAmount
	};
};

var Container = connect(mapStateToProps)(newsEntriesContainer);

module.exports = Container;