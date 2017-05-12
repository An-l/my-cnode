import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from '../containers/HomePage';
import FavoritePage from '../containers/FavoritePage';
import MessagePage from '../containers/MessagePage';
import MyPage from '../containers/MyPage';
// import Tabs from '../components/Tabs';
// import TabBar from '../components/TabBar';


class App extends Component {
    render() {
        return (
            <div className='app-container'>  
                {this.props.children}
            </div>
        );
    }
}

export default App;