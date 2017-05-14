import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Tabs, WhiteSpace } from 'antd-mobile';
import Header from '../components/common/Header';
import Tabs from '../components/Home/Tabs';
import List from '../components/common/List';

const tabs = [
        {
            title: '未读信息',
            filter: 'hasNotReadMessage',
        },
        {
            title: '已读信息', 
            filter: 'hasReadMessage',
        }
    ]

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'hasNotReadMessage'
        }
    }
    handleTabClick(selectedTab) {
        this.setState({
            selectedTab
        });
    }
    
    render() {
        const {message} = this.props;
        let messages = message[this.state.selectedTab];

        return (
            <div className='message'>
                <Header title='消息' />
                 <Tabs 
                    tabs={tabs}
                    onClick={this.handleTabClick.bind(this)}
                    >
                    <List messages={messages} />
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {login, message} = state;
    return {login, message}
}

export default connect(mapStateToProps)(Message);