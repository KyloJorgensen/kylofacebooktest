'use strict';

var redux = require('redux'),
	createStore = redux.createStore,
	applyMiddleware = redux.applyMiddleware,
	thunk = require('redux-thunk').default,
	cookie = require('./utilities/cookie'),
	userReducer = require('./reducers/user.reducer'),
	newsReducer = require('./reducers/news.reducer');

var initialState = {};

var initialState = function() {
	var savedState = cookie.get('savedState');
	if (savedState != '') {
		return JSON.parse(savedState);
	}
	return {};
};

var reducers = function(state, action) {
    state = state || initialState();
    var _state = {};
    // console.log(state);
	_state.user = userReducer(state.user, action);
	_state.news = newsReducer(state.news, action);
	cookie.set('savedState', JSON.stringify(_state), 7);
    return _state;
};

var store = createStore(reducers, applyMiddleware(thunk));

module.exports  = store;