import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/common/Header';
import ProfileComponent from '../components/common/Profile';
import TopicBox from '../components/common/Profile/TopicBox.js';
import { fetchProfile } from '../actions';

class Profile extends Component {
    
    componentWillMount() {
        let {login, profile, dispatch, routeParams} = this.props;
        let loginName = routeParams.loginName || '';
        if (profile.loginname !== loginName) {
            dispatch(fetchProfile(loginName))
        }
    }
    
    render() {
        let { profile, collectedTopics, login } = this.props;
        let title = login.loginName !== profile.loginname ? '用户详情' : '个人空间';
        return (
            <div className='profile'>
                <Header title={title}/>
                {
                    !profile.isFetching && <div>
                        <ProfileComponent profile={profile} />
                        <TopicBox profile={profile}/>
                    </div>
                }
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {profile, login} = state;
    const {collectedTopics} = profile;
    return {login, profile, collectedTopics}
}

export default connect(mapStateToProps)(Profile);