import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchArticle, collectTopic, deCollectTopic, getCollectedTopics } from '../actions'
import Header from '../components/Article/Header';
import Content from '../components/Article/Content';
import Comment from '../components/Article/Comment';
import Loading from '../components/common/Loading';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollected: false
        }
    }
    
    
    componentWillMount() {
        const {isFetching, article, dispatch} = this.props;
        // 如果文章作者不存在 并且 不在加载中， 则去根据路由参数id去加载文章
        if (!article.autor && !isFetching) {
            const topicId = this.props.params.id;
            dispatch(fetchArticle(topicId))
        }
        
    }
    componentWillReceiveProps(nextProps) {
        const {article} = nextProps;
        if (Object.keys(article).length) {
            let profile = null;
            // 判断是否已收藏
            if (window.localStorage.getItem('userProfile')) {
                profile = JSON.parse(window.localStorage.getItem('userProfile'))
            }
            let isCollected = profile.collectedTopics.some(topic => topic.id === article.id) ? true : false;
            
            this.setState({
                isCollected
            });
        }
    }

    handleCollectClick() {
        let {login, article} = this.props;
        let {isCollected} = this.state;
        
         //   如果用户已登录才允许进行收藏
        if (login.loginId) {
            if (!isCollected) {
                collectTopic(login.accessToken, article.id)
                    .then(res => {
                        if (res.success) {
                            this._updateCollectdTopics()
                            this.setState({
                                isCollected: true
                            });
                        }
                    });
            } else {
                deCollectTopic(login.accessToken, article.id)
                    .then(res => {
                        if (res.success) {
                            this._updateCollectdTopics()
                            this.setState({
                                isCollected: false
                            });
                        }
                    });
            }
        }else {
            alert('请先登录');
        }
    }
    // 更新profile中的CollectedTopics列表
    _updateCollectdTopics() {
        let {dispatch, login} = this.props;
        dispatch(getCollectedTopics(login.loginName))
    }
    
    render() {
        let {article, login, isFetching} = this.props;
        let profile = '';
        
        if (isFetching || !article.id) {
            return (
                <div className='article fade-in'>
                    <Header />
                    <Loading />
                </div>
            )
        }else {
            return (
                <div className='article fade-in'>
                    <Header />
                    {Object.keys(article).length!==0 
                        && <Content article={article} 
                            isCollected={this.state.isCollected}
                            onCollectClick={this.handleCollectClick.bind(this)} />}
                    {Object.keys(article).length!==0 && <Comment article={article} login={login}/>}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const {login, profile} = state;
    const {currentTopicId} = state.article ;
    // const {collectedTopics} = profile
    const isFetching = state.article[currentTopicId] ? state.article[currentTopicId].isFetching : false;
    //   const scrollT = state.article[currentTopicId]? state.article[currentTopicId].scrollT : '0';

    // 根据currentTopicId（当前选中的主题ID）初始化article, 若不存在则设为{}
    const article = state.article[currentTopicId] && state.article[currentTopicId].article ? state.article[currentTopicId].article : {};
    return {login, article, isFetching}
}

export default connect(mapStateToProps)(Article);