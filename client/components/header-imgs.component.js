'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var headerImgs = React.createClass({
	render: function() {  		
		return (
		    <div className="header-imgs-wrapper">
		    	<img id="header-img" src="http://www.rockfordbuzz.com/wp-content/uploads/abstract-art-mother-earth-1030x458.jpg" alt="abstract art" />
		    </div>
		);
	}
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(headerImgs);

module.exports = Container;