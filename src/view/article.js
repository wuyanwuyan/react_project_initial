import React from 'react';
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