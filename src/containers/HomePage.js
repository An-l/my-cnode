import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Tabs, WhiteSpace } from 'antd-mobile';
import {selectTab, selectPage, fetchTopics, logout} from '../actions'
import Header from '../components/Home/Header';
import Tabs from '../components/Home/Tabs';
import List from '../components/Home/List';

// import TabBar from '../components/TabBar';

import getSize from '../utils/getSize.js';

const tabs = [
        {
            title: '全部', 
            filter: 'all',
        },
        {
            title: '精华',
            filter: 'good',
        },
        {
            title: '分享',
            filter: 'share',
        },
        {
            title: '问答',
            filter: 'ask',
        },
        {
            title: '招聘',
            filter: 'job',
        }
    ]

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFreshing: false
        }
    }

    componentDidMount() {
        const {selectedTab, page, dispatch} = this.props;
        if (page ===0) {
            dispatch(fetchTopics(selectedTab));
        }

        let topicsList = document.getElementsByClassName('am-tabs-tabpane');
        for (let i = 0; i < topicsList.length; i++) {
            let that = this;
            topicsList[i].onscroll = () => {
                let {windowH} = getSize();
                let contentH = topicsList[i].scrollHeight;
                let scrollT = topicsList[i].scrollTop;
                
                if (windowH + scrollT + 80 > contentH) {  
                    that._loadMore()
                }
            };
        }   
    }
    componentWillUnmount() {
        let topicsList = document.getElementsByClassName('am-tabs-tabpane');
        for (let i = 0; i < topicsList.length; i++) {
            topicsList[i].onscroll = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        const {topics,isFetching,selectedTab,dispatch} = nextProps;
        // 如果没在Fetching并且topics列表为空， 则去fetch列表
        if(!isFetching && topics.length === 0){
            dispatch(fetchTopics(selectedTab));
        }

    }
    
    handleTabsClick(tab) {
        const {selectedTab,dispatch} = this.props;
        dispatch(selectTab(tab)) //换切tab
    }
    hanleLogout() {
        const {dispatch} = this.props;
        dispatch(logout());
        window.localStorage.removeItem('cnodeInfo')
    }

    _loadMore() {
        const {selectedTab, page, isFetching, dispatch} = this.props;

        if (!isFetching) {
            dispatch(fetchTopics(selectedTab, page+1))
        }
    }
    
    render() {
        let {topics, selectedPage, profile, login} = this.props;
        if (login.loginName !== profile.loginname && window.localStorage.getItem('userProfile')) {
            profile = JSON.parse(window.localStorage.getItem('userProfile'))
        }
        return (
            <div className='home'>
                <Header profile={profile} login={login} onLogout={this.hanleLogout.bind(this)}/>
                <Tabs 
                    tabs={tabs}
                    onClick={this.handleTabsClick.bind(this)}>
                    <List topics={topics}/>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {homePage, login, profile} = state;
    const {selectedTab,tabData} = homePage;
    
    const {isFetching,page,topics} = tabData[selectedTab] || {isFetching:false, page:0, topics:[]}
    return {isFetching, page, topics, selectedTab, tabData, login, profile}
    // return {selectedTab,tabData}
}

export default connect(mapStateToProps)(HomePage);