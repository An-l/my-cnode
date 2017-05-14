import React, { Component } from 'react';
import './styles.scss'
import { List } from 'antd-mobile';

const Item = List.Item;

class TopicBox extends Component {
    render() {
        let {profile:{recent_topics, recent_replies, collectedTopics}} = this.props;
        recent_topics = recent_topics ? recent_topics : [];
        recent_replies = recent_replies ? recent_replies : [];
        collectedTopics = collectedTopics ? collectedTopics : [];
        
        let topicsBox = (title, topics) => (
            <List className='topics-box' renderHeader={() => title}>
            {
                topics.map(topic => (
                    <Item
                        key={topic.id}
                        thumb={topic.author.avatar_url}
                        onClick={() => {}}>
                        {topic.title}
                    </Item>
                ))
            }
            </List>
        );

        return (
            <div>
                {topicsBox('最近收藏的主题', collectedTopics)}
                {topicsBox('最近参与的主题', recent_replies)}
                {topicsBox('最近创建的主题', recent_topics)}
                
            </div>
        );
    }
}

export default TopicBox;