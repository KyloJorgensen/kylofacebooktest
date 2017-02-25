'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var footer = React.createClass({
	render: function() {  		
		return (
		    <div className="footer-wrapper" id="footer">
		    	<div className="container">
		    		<Link to={'/admin'} className="button alt" >ADMIN</Link>
		    	</div>
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(footer);

module.exports = Container;