import React from "react";
import "./MenuButton.scss";

export default class MenuButton extends React.Component {
    static defaultProps = {
        select: f => f,
    }

    constructor(props) {
        super(props);
        this.state = {
            active: false
        }

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({active: false});
        }

    }

    menuClick = (event) => {
        event.stopPropagation();
        this.setState({active: !this.state.active});
    }

    _onSelectItem = (v) => () => {
        this.props.select(v);
        this.setState({active: false});

    }


    render() {
        const {text, option} = this.props;
        const {active} = this.state;
        return (
            <div className="menuButtom" ref={r => this.wrapperRef = r}>
                <div onClick={this.menuClick}>
                    <label>{text}</label>
                </div>
                {active && <div className="menuItem">
                    {
                        option.map((v, i) =>
                            <div key={v} onClick={this._onSelectItem(v)} className={v == text ? "active" : ""}>
                                {v}
                            </div>
                        )
                    }
                </div>}
            </div>
        )
    }
}