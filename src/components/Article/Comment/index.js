import React, { Component } from 'react';
import { List, Icon } from 'antd-mobile';
import './styles.scss'

const Item = List.Item;
const Brief = Item.Brief;

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSupported: [],
            supportNum: []
        }
    }
    
    componentWillMount() {
        let {article: {replies}, login} = this.props
		this._initSupporState(replies, login)
    }

    handleSupporToggle(reply, index) {
        let {login} = this.props;
        //   如果用户已登录才允许进行点赞
        if (login.loginId) {
            //   不允许用户给自己点赞
            if(reply.author.loginname !== login.loginName){
                let isSupported = this.state.isSupported;
                let supportNum = this.state.supportNum;

                // 如果之前为（未）点赞， 则 （增加）减少该评论的点赞数
                isSupported[index] ? --supportNum[index] : ++supportNum[index]
                isSupported[index] = !isSupported[index]  // 设置当前评论为相反点赞状态
                this.setState({
                    isSupported,
                    supportNum
                });
            }
        }else {
            alert('请先登录');
        }
    }
    
    _initSupporState(replies, login) {
        let isSupported = replies.map(reply => {
            // 针对每条评论返回 - 我是否已经点赞(true or false) -> [true, false, flase]
            return reply.ups.some(up => up === login.loginId)
        })
        let supportNum = replies.map(reply => reply.ups.length) //每条评论的点赞数 -> [1, 1, 2]
        this.setState({
            isSupported,
            supportNum
        });
    }
    
    render() {
        let {replies} = this.props.article;
        return (
            <div className='article-comment'>
                <div className='comment-count'>共{replies.length}条回复</div>
                <div className="comment-list">
                {
                    replies.map((reply, index) => (
                        <div className='comment-item' key={reply.id}>
                            <img className='comment-img' src= {reply.author.avatar_url}/>
                            <div className='comment-info'>
                                <span>{reply.author.loginname}</span>
                                <span style={{float:'right'}}>{reply.create_at.slice(0,10)}</span>
                            </div>
                            <div className='comment-content' dangerouslySetInnerHTML={{__html: reply.content}}></div>
                            <div className='comment-good' style={{textAlign:'right'}}
                                onClick={this.handleSupporToggle.bind(this, reply, index)}>
                                <span>
                                    <Icon 
                                        type={require('../../../images/good.svg')}
                                        style={{color:this.state.isSupported[index] ? 'red':'black',cursor:'pointer'}}
                                    />
                                    {this.state.supportNum[index]}
                                </span>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default Comment;