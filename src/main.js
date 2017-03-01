// CSS
import "./main.scss";

import React from 'react';
import ReactDOM from 'react-dom';

// 引入React-Router模块
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {createStore} from 'redux';
// 引入redux模块

import {Provider} from 'react-redux';
import reducer from './redux/reducer';

// 引入单个页面（包括嵌套的子页面）
import Header from "./view/header/Header";

// 配置整体组件
class Init extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        )
    }
}

let initState = {
    testInfo: "hellos"
}
let store = createStore(reducer, initState);

// 配置路由，并将路由注入到id为init的DOM元素中  // redux和react连接
ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Init}>

            </Route>
        </Router>
    </ Provider >
), document.querySelector('#root'));
