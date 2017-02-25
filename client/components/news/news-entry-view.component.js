'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link,
	cookie = require('../../utilities/cookie'),
	newsActions = require('../../actions/news.actions');

var newsEntry = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsEntry(this.props.params.idnews));
	},	
	createMarkup: function() {
		return {__html: this.props.newsEntry_content};
	},
	render: function() {
		var admin = [];
		
		if (cookie.get('adminkey')) {
			admin.push(<Link to={'/news/edit/' + this.props.params.idnews} key="admin" >EDIT</Link>)
		}

		return (
			<div className="news-entry-view" >
				<div className="news-entry-content" >
					<div className="news-entry-header">
						<h4>{this.props.newsEntry_title}</h4>
						<h5>{this.props.newsEntry_date_enter}</h5>
					</div>
					{admin}
					<div dangerouslySetInnerHTML={this.createMarkup()} />
				</div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return {
		newsEntry_idnews: state.news.currentEntry.idnews,
		newsEntry_title: state.news.currentEntry.title,
		newsEntry_date_enter: state.news.currentEntry.date_enter,
		newsEntry_content: state.news.currentEntry.content
	};
};

var Container = connect(mapStateToProps)(newsEntry);

module.exports = Container;