import React from 'react';
import ReactDOM from 'react-dom';

// 引入React-Router模块
import {Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
import {createStore} from 'redux';
// 引入redux模块
import reducer from '../redux/reducer';
import {Provider} from 'react-redux';

import '../css/normalize.css'
import './main.css';

// 引入单个页面（包括嵌套的子页面）
import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';
import IndexPage from '../container/IndexPage';
import ProductPage from '../component/productcenter/productcenter';
import downloadcenter from '../component/downloadcenter/downloadcenter';
import newsCenter from '../component/newsCenter/newscenter';
import newsList from '../component/newsCenter/newsList';
import newsContent from '../component/newsCenter/newsContent';
import aboutus from '../component/aboutus/aboutus';
// 引入主体样式

// 配置整体组件
class Init extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usermanage: '1',
            openKeys: []
        }
    }

    render() {
        return (
            <div>
                <Header logo={require("../images/logo.png")} phone="400-961-1988" qq="2885206805"/>
                <div id="content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}

let initState = {
    testInfo: "hellooooooooo"
}
let store = createStore(reducer, initState);

// 配置路由，并将路由注入到id为init的DOM元素中  // redux和react连接
ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Init}>
                <IndexRoute component={IndexPage}/>
                <Route path="re" component={ProductPage}/>
                <Route path="about" component={aboutus}/>
            </Route>
        </Router>
    </ Provider >
), document.querySelector('#init'))
