import React, { Component } from 'react';
import { List } from 'antd-mobile';
import './styles.scss'

const Item = List.Item;
const Brief = Item.Brief;

class myList extends Component {
    render() {
        let {messages} = this.props;
        return (
            <div className='article-comment'>
                <div className="comment-list">
                {
                    messages.map(message => (
                        <div className='comment-item' key={message.id}>
                            <img className='comment-img' src= {message.author.avatar_url}/>
                            <div className='comment-info'>
                                <span>{message.author.loginname}</span>
                                <span style={{float:'right'}}>{message.create_at.slice(0,10)}</span>
                            </div>
                            <div className='comment-content' dangerouslySetInnerHTML={{__html: message.reply.content}}></div>
                        </div>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default myList;