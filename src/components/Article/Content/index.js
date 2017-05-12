import React, { Component } from 'react';
import './styles.scss'

class Content extends Component {
    render() {
        let {article} = this.props;
        return (
            <div className='article-main'>
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