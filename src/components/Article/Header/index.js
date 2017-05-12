import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './styles.scss'

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <NavBar leftContent="back" mode="light" 
                onLeftClick={() => window.history.go(-1)}>
                    详细
                </NavBar>
            </div>
        );
    }
}

export default Header;