import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { TabBar, Icon } from 'antd-mobile';
import { browserHistory } from 'react-router'


/* eslint global-require: 0 */

class myTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            hidden: false,
        };
    }
    render() {
        let {selectedTab} = this.state;
        return (

            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white">

                <TabBar.Item
                    title="首页"
                    key="首页"
                    icon={<Icon type={require('../../images/homePage1.svg')} size="md"/>}
                    selectedIcon={<Icon type={require('../../images/homePage.svg')} size="md"/>}
                    selected={selectedTab === 'home'}
                    onPress={() => {
                        browserHistory.push('/');
                        this.setState({
                            selectedTab: 'home',
                        });
                    }}
                    data-seed="logId">
                </TabBar.Item>
                <TabBar.Item
                    title="收藏"
                    key="收藏"
                    icon={<Icon type={require('../../images/favPage1.svg')} size="md"/>}
                    selectedIcon={<Icon type={require('../../images/favPage.svg')} size="md"/>}
                    selected={selectedTab === 'favorite'}
                    onPress={() => {
                        browserHistory.push('/favorite');
                        this.setState({
                            selectedTab: 'favorite',
                        });
                    }}
                    data-seed="logId1">
                </TabBar.Item>
                <TabBar.Item
                    title="消息"
                    key="消息"
                    icon={<Icon type={require('../../images/messagePage1.svg')} size="md"/>}
                    selectedIcon={<Icon type={require('../../images/messagePage.svg')} size="md"/>}
                    selected={selectedTab === 'message'}
                    dot
                    onPress={() => {
                        browserHistory.push('/message');
                        this.setState({
                            selectedTab: 'message',
                        });
                    }}>
                </TabBar.Item>
                <TabBar.Item
                    title="我的"
                    key="我的"
                    icon={<Icon type={require('../../images/myPage1.svg')} size="md"/>}
                    selectedIcon={<Icon type={require('../../images/myPage.svg')} size="md"/>}
                    selected={selectedTab === 'me'}
                    onPress={() => {
                        browserHistory.push('/me');
                       this.setState({
                            selectedTab: 'me',
                        });
                    }}>
                </TabBar.Item>
            </TabBar>
        );
    }
}




export default myTabBar;