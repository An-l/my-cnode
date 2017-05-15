import React, { Component } from 'react';
import { Link } from 'react-router';
import { Drawer, List, NavBar, Button, Icon, Badge } from 'antd-mobile';
import ProfileComponent from '../../common/Profile';
import './styles.scss';

class Header extends Component {
    state = {
        open: false,
        position: 'left',
    }
    onOpenChange = (...args) => {
        // console.log(args);
        this.setState({ open: !this.state.open });
    }
    handleLogout() {
        let {onLogout} = this.props;
        onLogout && onLogout();
    }
    render() {
        let {profile, login} = this.props;
        let {succeed} = login;

        const sidebar = () => {
            if (succeed) {
             return(<div>
                <ProfileComponent profile={profile} />
                <Button type="primary" inline size="small" 
                    onClick={() =>  this.handleLogout()}>
                    注销登录
                </Button>
                <div style={{paddingTop: 50}}>
                    <Link className='btn am-button' to={`profile/${login.loginName}`}>个人主页</Link>
                    <Link className='btn am-button' to='message'>消息</Link>
                    <Button className="btn">发表文章</Button>
                </div>
            </div>) 
            } else {
                return (<div style={{paddingTop:'1.8rem'}}>
                    <Link to='login'>
                        <div className='login-img'></div>
                        <span>请登录</span>
                    </Link>
                </div>)
            }
        }

        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
            onOpenChange: this.onOpenChange,
        };
    
        return (
            <div>
                <NavBar
                className='header' 
                iconName="ellipsis" 
                rightContent={[
                    <Link to='message'>
                        <Badge dot>
                            <Icon type={require('../../../images/remind.svg')}/>
                        </Badge>
                    </Link>
                ]}
                onLeftClick={this.onOpenChange}>
                    首页
                </NavBar>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight}}
                    dragHandleStyle={{ display: 'none' }}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
                    sidebar={sidebar()}
                    {...drawerProps}>
                    Click upper-left corner icon
                </Drawer>
            </div>
        );
    }
}

export default Header;