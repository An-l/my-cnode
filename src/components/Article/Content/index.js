import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon, Grid } from 'antd-mobile';
import './styles.scss'

class Content extends Component {
    render() {
        let {article, isCollected, onCollectClick} = this.props;
        let classCollected = isCollected ? 'is-collected' : '';
        return (
            <div className='article-main'>
                <div className='article-author'>
                    <Link to={`profile/${article.author.loginname}`}>
                        <img className='article-img' src={article.author.avatar_url} />
                    </Link>
                    <div className='article-info'>
                        <Link to={`profile/${article.author.loginname}`}>{article.author.loginname}</Link>
                        <span className='createdAt'>发表于{article.create_at.slice(0,10)}</span>
                    </div>
                    <div className='article-info'>
                        <span>收藏
                            <Icon 
                                className={classCollected} 
                                type={require('../../../images/favorites-filling.svg')}
                                onClick={() => onCollectClick()}/>
                        </span>
                        <span className='reply_count'>回复：{article.reply_count} 浏览：{article.visit_count}</span>
                    </div>
                </div>

                <div className='article-title'>
                    <h1>{article.title}</h1>
                </div>

                <div className='article-content' dangerouslySetInnerHTML={{__html: article.content}}></div>
            </div>
        );
    }
}

export default Content;