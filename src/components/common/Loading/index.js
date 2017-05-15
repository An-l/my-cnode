import React, { Component } from 'react';
import {Toast,WingBlank} from 'antd-mobile';

class myLoading extends Component {
    componentDidMount() {
        Toast.loading('加载中...', 5, () => {});
    }
    componentWillUnmount() {
        Toast.hide()
    }

    render() {
        return (
            <WingBlank>
            </WingBlank>
        )
    }
}

export default myLoading;