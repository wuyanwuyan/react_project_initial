import React from 'react';
import {Tabs, Tab} from './tabs/Tabs';

var logo = require('../../assets/img/logo.png');
var historyImg = require('../../assets/img/history_ico n.png');
var searchIcon = require('../../assets/img/search_ico n.png');
import style from './Header.scss';

export default class Header extends React.Component {

    render() {
        return (
            <div>
                <div className="clearfix">
                    <img src={logo} className={style.logo}/>
                    <img src={historyImg} className={style.icon}/>
                    <img src={searchIcon} className={style.icon}/>
                </div>


                <Tabs>
                    <Tab name="首页">
                        <a>首页</a>
                    </Tab>
                    <Tab name="频道">
                        <a>频道</a>
                    </Tab>
                    <Tab name="直播">
                        <a>直播</a>
                    </Tab>
                    <Tab name="排行">
                        <a>排行</a>
                    </Tab>
                    <Tab name="我的">
                        <a>我的</a>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}