'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	newsActions = require('../../actions/news.actions');

var newsEntry = React.createClass({
	
	editField: function(that) {
		var state = this.state;
		state[that.target.name] = that.target.value;
		this.setState(state);
	},
	saveNewsEntry: function() {
		console.log('save');
		this.props.dispatch(newsActions.updateNewsEntry(this.state));
	},
	deleteNewsEntry: function() {
		console.log('delete');
		this.props.dispatch(newsActions.removeNewsEntry(this.state));
	},
	componentWillMount: function() {
		var _state = {
			idnews: this.props.newsEntry_idnews,
			title: this.props.newsEntry_title,
			date_enter: this.props.newsEntry_date_enter,
			content: this.props.newsEntry_content
		};

		this.setState(_state);
	},
	componentDidMount: function() {
		this.props.dispatch(newsActions.getNewsEntry(this.props.params.idnews));
	},
	componentWillReceiveProps: function(nextProps) {
		var _state = this.state;
		_state.idnews = nextProps.newsEntry_idnews;
		_state.title = nextProps.newsEntry_title;
		_state.date_enter = nextProps.newsEntry_date_enter;
		_state.content = nextProps.newsEntry_content;
		this.setState(_state);
	},
	createMarkup: function() {
		return {__html: this.state.content};
	},
	render: function() {
		return (
			<div className="news-entry-edit">
					<div>
						Title: 
						<input type="text" onChange={this.editField} name="title" value={this.state.title} />
						<p>{this.state.date_enter} </p>
					</div>
					Content:
					<textarea onChange={this.editField} name="content" value={this.state.content} />
					<div>
						<button onClick={this.saveNewsEntry} >SAVE</button>
						<button className="right" onClick={this.deleteNewsEntry} >DELETE</button>
					</div>

					<div className="news-entry-view" >
						<div className="news-entry-content" >
							<div className="news-entry-header">
								<h4>{this.state.title}</h4>
								<h5>{this.state.date_enter}</h5>
							</div>
							<div dangerouslySetInnerHTML={this.createMarkup()} />
						</div>
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