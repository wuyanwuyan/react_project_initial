import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';
import './main.scss';

class BitChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Chart />
        )
    }
}


let initState = window.__INITIAL_STATE__ || {};
ReactDOM.render(<BitChart {...initState}/>, document.getElementById("root"));

export default BitChart;