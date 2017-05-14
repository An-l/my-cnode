import React, { Component } from 'react';

class Test extends Component {
    render() {
        return (
            <div>
                <div className='user-info'>
                    <img src='https://avatars3.githubusercontent.com/u/19908275?v=3&s=120'/>
                    <p>Mwangzi</p>
                    <p>积分：290</p>
                    <p>注册于：2014-02-21</p>
                    <div>注销登录</div>
                </div>
                <a>个人主页</a>
                <a>消息</a>
                <a>发表新文章</a>
            </div>
        );
    }
}

export default Test;