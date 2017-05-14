import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
const TabPane = Tabs.TabPane;
import './styles.scss';

class myTabs extends Component {
    
    handleChange(key) {
        let {onClick} = this.props;
        onClick && onClick(this.props.tabs[key].filter);
    }

    render() {
        return (
            <Tabs className='tabBar' defaultActiveKey="0" swipeable={false} onChange={this.handleChange.bind(this)}>
            {
                this.props.tabs.map((tab, index) =>
                    <TabPane tab={tab.title} key={index}>
                        <div className='tabBar-item'>
                        {this.props.children}
                        </div>
                    </TabPane>
                )
            }
            </Tabs>
        );
    }
}

export default myTabs;