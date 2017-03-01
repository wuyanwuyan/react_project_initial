import React from 'react';
import classNames from 'classnames';
import './tabs.scss';
export class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    getTitleItemCssClasses = (index) => {
        return index === this.state.currentIndex ? "tab-title-item active" : "tab-title-item";
    }

    getContentItemCssClasses = (index) => {
        return index === this.state.currentIndex ? "tab-content-item active" : "tab-content-item";
    }

    onClickTab(index) {
        this.state.currentIndex !== index &&  this.setState({currentIndex: index});
    }

    render() {
        let that = this;
        var widtPercent = (100.0 / that.props.children.length).toFixed(2) + "%";
        return (
            <div>
                <nav className="tab-nav">
                    {React.Children.map(this.props.children, (element, index) => {
                        return (<div onClick={() => {this.onClickTab(index)}}
                                     className={that.getTitleItemCssClasses(index)}
                                     style={{width:widtPercent}}>{element.props.name}</div>)
                    })}
                </nav>
                <div className="tab-content-items">
                    {React.Children.map(this.props.children, (element, index) => {
                        return (<div className={that.getContentItemCssClasses(index)}>{element}</div>)
                    })}
                </div>
            </div>
        )
    }
}

export class Tab extends React.Component {
    render() {
        return (<div>{this.props.children}</div>);
    }
}
