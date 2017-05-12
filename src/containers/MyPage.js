import React, { Component } from 'react';
// import { Tabs, WhiteSpace } from 'antd-mobile';
// import Tabs from '../components/Tabs';
// import TabBar from '../components/TabBar';


class MyPage extends Component {
    render() {
        const {history} = this.props;
        return (
            <div>
                <header className='header'>
                    我的
                </header>
                <main className='main'>关于我</main>
                <footer className='footer'>
                    <TabBar history={history}/>
                </footer>
            </div>
        );
    }
}

export default MyPage;