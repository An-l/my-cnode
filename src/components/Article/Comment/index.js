import React, { Component } from 'react';
import { List } from 'antd-mobile';
import './styles.scss'

const Item = List.Item;
const Brief = Item.Brief;

class Comment extends Component {
    render() {
        let {replies} = this.props.article;
        return (
            <div className='article-comment'>
                <div className='comment-count'>共{replies.length}条回复</div>
                <div className="comment-list">
                {
                    replies.map(reply => (
                        <div className='comment-item' key={reply.id}>
                            <img className='comment-img' src= {reply.author.avatar_url}/>
                            <div className='comment-info'>
                                <span>{reply.author.loginname}</span>
                                <span style={{float:'right'}}>{reply.create_at.slice(0,10)}</span>
                            </div>
                            <div className='comment-content' dangerouslySetInnerHTML={{__html: reply.content}}></div>
                        </div>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default Comment;