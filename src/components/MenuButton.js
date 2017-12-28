import React from 'react';
import './MenuButton.scss';

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
    }


    render() {
        const {text} = this.props;
        return (
            <div className="menuButtom">
                <div>
                    <label>{text}</label>
                </div>
                {/*<div className="menuItem">*/}

                {/*</div>*/}
            </div>
        )
    }
}