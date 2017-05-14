import React, { Component } from 'react';
import { InputItem, Button } from 'antd-mobile';
import { fetchAccess } from '../../../actions';
import './styles.scss'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
    }
    
    
    handleChange(val) {
        this.setState({
            token: val
        });
    }
    
    handleSubmit() {
        let {dispatch} = this.props;
        
        let token = this.state.token.trim();
        if (!token) {
            return null;
        }
        dispatch(fetchAccess(token));
    }

    render() {
        let {succeed, failedMessage} = this.props;
        return (
            <div className='login-form'>
                <InputItem
                    placeholder="请输入Access Token进行登录"
                    value={this.state.token}
                    onChange={(val) => this.handleChange(val)}
                />
                <Button className='login-btn' type="primary" inline size="large"
                    onClick={this.handleSubmit.bind(this)}>登录</Button>

                {!succeed && failedMessage && <h2 style={{color: 'red',fontSize: '0.4rem'}}>{failedMessage}</h2>}
            </div>
        );
    }
}

export default LoginForm;