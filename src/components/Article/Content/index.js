import React, { Component } from 'react';
import { Icon, Grid } from 'antd-mobile';
import './styles.scss'

class Content extends Component {
    render() {
        let {article} = this.props;
        return (
            <div className='article-main'>
                <div className='article-author'>
                    <img className='article-img' src={article.author.avatar_url} />
                    <div className='article-info'>
                        <a href='#'>{article.author.loginname}</a>
                        <span className='createdAt'>发表于{article.create_at.slice(0,10)}</span>
                    </div>
                    <div className='article-info'>
                        <span>收藏<Icon type="check-circle-o" size="md" color="" /></span>
                        <span className='reply_count'>回复：{article.reply_count} 浏览：{article.visit_count}</span>
                    </div>
                </div>
                <div className='article-title'>
                    <h1>{article.title}</h1>
                </div>
                <div className='article-content' dangerouslySetInnerHTML={{__html: article.content}}>
                    
                </div>
            </div>
        );
    }
}

export default Content;