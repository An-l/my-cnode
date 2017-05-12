import React, { Component } from 'react';
// import { Tabs, WhiteSpace } from 'antd-mobile';
// import Tabs from '../components/Tabs';
// import TabBar from '../components/TabBar';


class MessagePage extends Component {
    render() {
        const {history} = this.props;
        return (
            <div>
                <header className='header'>
                    消息
                </header>
                <main className='main'>消息</main>
                <footer className='footer'>
                    <TabBar history={history}/>
                </footer>
            </div>
        );
    }
}

export default MessagePage;