'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Header = require('../header.component'),
	Footer = require('../footer.component'),
	newsActions = require('../../actions/news.actions'),
	appConfig = require('../../app.cfg');

var newsPage = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.setEntriesAmount(appConfig.NEWS_LIST_COUNT));
	},
	render: function() {
		return (
		    <div className="news-page-wrapper">
		    	<Header/>
				{this.props.children}
		    	<Footer />
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(newsPage);

module.exports = Container;