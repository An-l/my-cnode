import React, { Component } from 'react';
import { Link } from 'react-router';
import { NavBar, Icon } from 'antd-mobile';
import './styles.scss'

class Profile extends Component {
    render() {
        let {profile} = this.props;
        return (
            <div className='user-info'>
                <Link to={`profile/${profile.loginname}`}>
                    <img src={profile.avatar_url}/>
                    <p className='username'>{profile.loginname}</p>
                </Link>
                <p>积分：{profile.score}</p>
                <p>注册于：{profile.create_at ? profile.create_at.slice(0,10) : ''}</p>
                
            </div>
        );
    }
}

export default Profile;