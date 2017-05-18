import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import { fetchAccess, fetchProfile, fetchMessage } from '../actions';


class App extends Component {
    
    componentWillMount() {
        const {dispatch} = this.props;
        // 页面加载时进行的数据加载
        const LoadingAction = (accessToken, loginName) => {
            dispatch(fetchAccess(accessToken)) //根据accessToken进行登录验证
            dispatch(fetchProfile(loginName)); //根据loginName获取用户信息
            dispatch(fetchMessage(accessToken)); //根据accessToken获取用户已读和未读信息
        }

        // 默认登录
        if (window.localStorage.getItem('cnodeInfo')) {
            // 如果localStorage中存在，就从localStorage中读取
            let cnodeInfo = window.localStorage.getItem('cnodeInfo');
            cnodeInfo = JSON.parse(cnodeInfo);
            const accessToken = cnodeInfo.accessToken;
            const loginName = cnodeInfo.loginName;
            LoadingAction(accessToken, loginName)
        } else {
            const accessToken = '467befde-397c-42a9-8dd4-acf9ba4097ea';
            const loginName = 'An-l';
            LoadingAction(accessToken, loginName);
        }
    }
    componentWillReceiveProps(nextProps) {
        let {login, profile} = nextProps;
        if (login.succeed && !profile.isFetching && login.loginName === profile.loginname) {
            window.localStorage.setItem('userProfile', JSON.stringify(profile))
        }
    }
    
    
    render() {
        return (
            <div className='app-container'>  
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {login, profile} = state;
    return {login, profile}
}

export default connect(mapStateToProps)(App);