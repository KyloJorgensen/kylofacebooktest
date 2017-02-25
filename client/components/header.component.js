'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var header = React.createClass({
	render: function() {  		
		return (
		    <div className="header-wrapper">
		    	<div className="container">
		    		<div className="Logo">
			    		<h1>Brad Ashworth</h1>
					</div>
					<nav>
						<Link to={'/'}>HOME</Link> 
						<Link to={'/news'}>NEWS</Link>
					</nav>
		    	</div>
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(header);

module.exports = Container;