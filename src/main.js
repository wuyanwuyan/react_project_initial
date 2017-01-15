import React from 'react';
import ReactDOM from 'react-dom';

// 引入React-Router模块
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {createStore} from 'redux';
// 引入redux模块

import {Provider} from 'react-redux';
import reducer from './redux/reducer';

// 引入公用样式

// 引入单个页面（包括嵌套的子页面）
import IndexView from "./view/IndexView";
import Recommend from "./view/Recommend";
import Article from "./view/Article";

// 配置整体组件
class Init extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

let initState = {
    testInfo: "helloooo454ooooo"
}
let store = createStore(reducer, initState);

// 配置路由，并将路由注入到id为init的DOM元素中  // redux和react连接
ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Init}>
                <IndexRoute component={IndexView}/>
                <Route path="recommend" component={Recommend}/>
                <Route path="article" component={Article}/>
            </Route>
        </Router>
    </ Provider >
), document.querySelector('#root'));
