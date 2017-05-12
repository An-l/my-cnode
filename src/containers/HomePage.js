import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Tabs, WhiteSpace } from 'antd-mobile';
import {selectTab, selectPage, fetchTopics} from '../actions'
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
        if(!isFetching && topics.length === 0){
            dispatch(fetchTopics(selectedTab));
        }

    }
    
    handleTabsClick(tab) {
        const {selectedTab,dispatch} = this.props;
        dispatch(selectTab(tab)) //换切tab
    }
    handleTabBarClick(tab) {
        debugger
        const {selectedPage,dispatch} = this.props;
        dispatch(selectPage(tab)) //换切page
    }

    _loadMore() {
        const {selectedTab, page, isFetching, dispatch} = this.props;

        if (!isFetching) {
            dispatch(fetchTopics(selectedTab, page+1))
        }
    }
    
    render() {
        const {topics, selectedPage} = this.props;
        return (
            <div className='home'>
                <Header />
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
    const {homePage, selectedPage} = state;
    const {selectedTab,tabData} = homePage;
    
    const {isFetching,page,topics} = tabData[selectedTab] || {isFetching:false, page:0, topics:[]}
    return {selectedPage, isFetching, page, topics, selectedTab, tabData}
    // return {selectedTab,tabData}
}

export default connect(mapStateToProps)(HomePage);