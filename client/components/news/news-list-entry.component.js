'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions'),
	Link = require('react-router').Link;

var newsEntry = React.createClass({
	createMarkup: function() {
		return {__html: this.props.content};
	},
	render: function() {
		return (
			<li className="news-entry" >
				<Link to={'/news/view/' + this.props.idnews} >
					<div className="news-entry-content" >
						<div className="news-enrty-header">
							<h4>{this.props.title}</h4>
							<h5>{this.props.date_enter}</h5>
						</div>
						<div dangerouslySetInnerHTML={this.createMarkup()} />
					</div>
				</Link>
			</li>
		);	
	}
});

var mapStateToProps = function(state, props) {
	var _props = {};

	var d = new Date();

	if (state.news.newsEntries[props.newsEntryNumber] == undefined) {
		_props.idnews = 'false';
		_props.title = 'News Loading';
		_props.date_enter = d.toLocaleDateString();
		_props.content = 'News Loading please wait';
	} else {
		_props.idnews = state.news.newsEntries[props.newsEntryNumber].idnews || false;
		_props.title = state.news.newsEntries[props.newsEntryNumber].title || false;
		_props.date_enter = state.news.newsEntries[props.newsEntryNumber].date_enter || false;
		_props.content = state.news.newsEntries[props.newsEntryNumber].content || false;
	}

	return _props;
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;