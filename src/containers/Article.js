import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchArticle} from '../actions'
import Header from '../components/Article/Header';
import Content from '../components/Article/Content';
import Comment from '../components/Article/Comment';

class Article extends Component {
    
    componentWillMount() {
        const {isFetching, article, dispatch} = this.props;

        if (!article.autor && !isFetching) {
            const topicId = this.props.params.id;
            dispatch(fetchArticle(topicId))
        }
    }
    
    render() {
        let {article} = this.props;
        return (
            <div className='article'>
                <Header />
                {Object.keys(article).length!==0 && <Content article={article}/>}
                {Object.keys(article).length!==0 && <Comment article={article}/>}
            </div>
        );
    }
}

function mapStateToProps(state) {
//   const {currentRouter,login,profile} = state;
  const {currentTopicId,switchSupportInfo,isCommented} = state.article ;
//   const {collectedTopics} = profile
  const isFetching = state.article[currentTopicId] ? state.article[currentTopicId].isFetching : false;
//   const scrollT = state.article[currentTopicId]? state.article[currentTopicId].scrollT : '0';
  const article = state.article[currentTopicId] && state.article[currentTopicId].article ? state.article[currentTopicId].article : {};
  return {article, isFetching}
//   return {isFetching,scrollT,article,currentTopicId,login,switchSupportInfo,currentRouter,collectedTopics,profile,isCommented}
}

export default connect(mapStateToProps)(Article);