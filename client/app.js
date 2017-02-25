'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider,
    store = require('./store'),
    App = require('./components/app.component'),
    MainPage = require('./components/main-page.component'),
    NewsPage = require('./components/news/news-page.component'),
    NewsListContainer = require('./components/news/news-list-container.component.js'),
    NewsEntryView = require('./components/news/news-entry-view.component'),
    NewsEntryEdit = require('./components/news/news-entry-edit.component'),
    NewsEntryNew = require('./components/news/news-new.component'),
    AdminPage = require('./components/admin-page.component'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    hashHistory = router.hashHistory,
    IndexRoute = router.IndexRoute;

var routes = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={MainPage} />
                <Route path="news" component={NewsPage} >
                    <IndexRoute component={NewsListContainer} />
                    <Route path="list/:pageNumber" components={NewsListContainer} />
                    <Route path="view/:idnews" component={NewsEntryView} />
                    <Route path="edit/:idnews" component={NewsEntryEdit} />
                    <Route path="new" component={NewsEntryNew} />
                </Route>
                <Route path="admin" component={AdminPage} />
            </Route>
        </Router>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});