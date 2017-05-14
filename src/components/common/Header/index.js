import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './styles.scss'

class Header extends Component {
    render() {
        let {title} = this.props;
        return (
            <div className='header'>
                <NavBar leftContent="back" mode="light" 
                onLeftClick={() => window.history.go(-1)}>
                    {title}
                </NavBar>
            </div>
        );
    }
}

export default Header;