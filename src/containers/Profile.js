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
        // 根据路由传过来得loginName和profile中的loginname进行比较， 
        // 当两者不同时才去加载新的profile， 避免了profile重加载
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