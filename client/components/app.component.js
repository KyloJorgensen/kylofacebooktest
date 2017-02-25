'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    userActions = require('../actions/user.actions');

var App = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(userActions.updateAdminKey());
    },
    render: function() {
        return (
            <div className="app">
                <div className="app-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(App);

module.exports = Container;