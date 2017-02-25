'use strict';

var actions = require('../actions/user.actions');

var userInitialState = {
	key: false
};

var userReducer = function(state, action) {
    state = state || userInitialState;
    if (action.type === actions.GET_USER_NAME_SUCCESS) {
    	state.name = action.name;
    }
    if (action.type === actions.LOGIN_ERROR) {
    	console.log(action.error);
    	state.key = false;
    }
    if (action.type === actions.LOGOUT_SUCCESS) {
        state.key = false;
    }
    if (action.type === actions.LOGOUT_ERROR) {
        state.key = false;
    }
    if (action.type === actions.UPDATE_ADMIN_KEY) {
    	state.key = action.key;
    }
    return state;
};

module.exports = userReducer;