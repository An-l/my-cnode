import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import FavoritePage from './containers/FavoritePage';
import MessagePage from './containers/MessagePage';
import Article from './containers/Article';
import Test from './containers/Test'
import Profile from './containers/Profile'
import Login from './containers/Login'


// const PublishTopica = (location, cb) => {  //路由按需处理
// 	require.ensure([], require => {
// 	    cb(null, require('./containers/PublishTopic').default)
// 	},'PublishTopica')
// }     

const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={HomePage}/>
        <Route path='favorite' component={FavoritePage}/>
        <Route path='message' component={MessagePage}/>
        <Route path='topic/:id' component={Article}/>
        <Route path='test' component={Test}/>
        <Route path='profile/:loginName' component={Profile}/>
        <Route path='login' component={Login}/>
    </Route>
);
export default routes;