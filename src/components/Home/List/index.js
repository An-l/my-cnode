import React, { Component } from 'react';
import {Link} from 'react-router';
import { List } from 'antd-mobile';
import styles from './styles.scss'

const Item = List.Item;
const Brief = Item.Brief;

class MyList extends Component {
    render() {
        const {topics} = this.props;
        return (
            <List className="topics-list">
                {
                    topics.map(topic => (
                        <Link  key={topic.id} to={`topic/${topic.id}`}>
                            <Item className='title'
                                extra={topic.create_at.slice(0,10)} align="top" 
                                thumb={topic.author.avatar_url} multipleLine>
                                {topic.top ? <span className='top'>顶 </span> : ' '}
                                {topic.good ? <span className='good'>精 </span> : ' '}
                                {topic.title} 
                                <Brief>{`${topic.reply_count}回复 - ${topic.visit_count}浏览`}</Brief>
                            </Item>
                        </Link>
                    ))
                }
            </List>
        );
    }
}

export default MyList;