'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	newsActions = require('../../actions/news.actions'),
	appConfig = require('../../app.cfg');

var newspage = React.createClass({
	render: function() {
		var totalPages = ( ( this.props.totalEntries - ( this.props.totalEntries % appConfig.NEWS_LIST_COUNT  ) ) / appConfig.NEWS_LIST_COUNT  );
		if (this.props.totalEntries % appConfig.NEWS_LIST_COUNT  != 0) {
			totalPages++;
		}

		var currentPage = this.props.pageNumber || 1;
		
		var previousPage = currentPage;
		if (currentPage != 1) {previousPage--}
		var previousButton = [];
		previousButton.push(<Link key={1} to={'/news/list/' + previousPage} className="alt previous" >PREVIOUS</Link>);

		var nextpage = currentPage;
		if (currentPage < totalPages) {nextpage++}
		var nextButton = [];
		nextButton.push(<Link key={1} to={'/news/list/' + nextpage} className="alt next" >NEXT</Link>);
		
		return (
			<div className="page-changer-wrapper container">
				<div className="page-changer">
					{previousButton}
					<p>{currentPage} / {totalPages}</p>
					{nextButton}
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {
    	totalEntries: state.news.totalEntries
    };
};

var Container = connect(mapStateToProps)(newspage);

module.exports = Container;