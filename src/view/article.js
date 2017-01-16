import React from 'react';
import style from '../components/article.scss'
import {Link, IndexLink} from 'react-router';

import classNames from 'classnames';

export default class Article extends React.Component {

    render() {
        var className = classNames(style.title,"article");
        return (
            <div className={className}>
                Article11
            </div>
        );
    }
}