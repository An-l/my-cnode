import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/common/Header';
import LoginForm from '../components/Login/LoginForm';
import { fetchAccess, fetchProfile } from '../actions';

class Login extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let {succeed, loginName, accessToken, profile, dispatch } = nextProps;
        if (succeed && !profile.isFetching) {
            // 如果localStorage中不存在，则把accessToken和loginName存入localStorage
            if (!window.localStorage.getItem('cnodeInfo')) {
                let cnodeInfo = {accessToken, loginName};
                window.localStorage.setItem('cnodeInfo', JSON.stringify(cnodeInfo));
            }
            dispatch(fetchProfile(loginName));
            this.props.router.push('/');
        }
    }
    render() {
        return (
            <div>
                <Header title='个人中心'/>
                <LoginForm {...this.props}/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const {login, profile} = state;
    const {failedMessage,succeed,loginName,loginId,accessToken} = login;
    return {failedMessage,succeed,loginName,loginId,accessToken, profile}
}

export default connect(mapStateToProps)(Login);