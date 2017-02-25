'use strict';

var actions = require('../actions/news.actions'),
    appConfig = require('../app.cfg');

var d = new Date();

var newsInitialState = {
    newsEntries: [],
    currentPage: 1,
    totalEntries: 0,
    currentEntry: {
        idnews: 'false',
        title: 'News Loading',
        date_enter: d.toLocaleDateString(),
        content: 'News Loading please wait...'
    }
};

var newsReducer = function(state, action) {
    state = state || newsInitialState;
    if (action.type === actions.GET_NEWS_ENTRY_SUCCESS) {
        state.currentEntry.idnews = action.data.idnews;
        state.currentEntry.title = action.data.title;
        state.currentEntry.date_enter = action.data.date_enter;
        state.currentEntry.content = action.data.content;
    }
    if (action.type === actions.GET_NEWS_ENTRY_ERROR) {
        state.currentEntry.idnews = false;
        state.currentEntry.title = 'No News';
        state.currentEntry.date_enter = d.toLocaleDateString();
        state.currentEntry.content = 'No news, please try back later.';
    }
    if (action.type === actions.GET_NEWS_ENTRIES_SUCCESS) {
        
        for (var i = 0; i < action.data.news.length; i++) {
            state.newsEntries[Number(action.data.offset) + i] = action.data.news[i];
        }
        
        if (state.totalEntries > action.data.totalEntries) {
            state.newsEntries.splice(state.totalEntries + 1, action.data.totalEntries - state.totalEntries);
        }
        
        state.totalEntries = action.data.totalEntries;

    }
    if (action.type === actions.GET_NEWS_ENTRIES_ERROR) {
        state.newsEntries = [];
        console.log(action.error);
    }
    if (action.type === actions.NEXT_PAGE) {
        if ((state.currentPage) * appConfig.NEWS_LIST_COUNT < state.totalEntries) {
           state.currentPage++; 
        }
    }
    if (action.type === actions.PREVIOUS_PAGE) {
        if (state.currentPage != 1) {
            state.currentPage--;
        }
    }
    if (action.type === actions.SET_ENTRIES_AMOUNT) {
        state.entriesAmount = action.amount;
    }
    return state;
};

module.exports = newsReducer;