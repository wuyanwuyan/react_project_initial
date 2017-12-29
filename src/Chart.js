import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import {getUrlParam} from './utils/urlCore';
import {fetchGet} from './utils/fetchUtil';
import  MenuButton from './components/MenuButton';

HighchartsMore(Highcharts);

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            market:getUrlParam('market') || 'binance',
            symbol:getUrlParam('symbol') || 'BTC_USDT',
            interval:'',
        }

    }

    componentDidMount() {
        this._fetchChartData();
    }


    _fetchChartData = () => {
        const {market, symbol} = this.state;

        if (this.state.interval) {

            fetchGet('/exchange/kline', {
                market,
                symbol,
                interval: this.state.interval
            }).then((kData) => {
                return this._dealData(kData)
            }).catch((e) => {
                console.log('e  ', e);
                this.setState({noData: true});
            });
            return;
        }

        fetchGet('/exchange/exists_kline', {market}).then(isExist => {
            return isExist ? fetchGet(`/exchange/kline_interval/${decodeURIComponent(market)}`) : Promise.reject();
        }).then(timeData => {
            let timeDataArr = timeData.slice(0, 5);
            let interval = timeDataArr[0];

            this.setState({timeDataArr, interval});


            return fetchGet('/exchange/kline', {
                market,
                symbol,
                interval: interval
            })

        }).then((kData) => {
            return this._dealData(kData)
        }).catch((e) => {
            alert( e);
            this.setState({noData: true});
        });
    }


    _dealData = (kData) => {
        // split the data set into ohlc and volume
        var ohlc = [],
            volume = [],
            dataLength = kData.length,
            // set the allowed units for data grouping
            groupingUnits = [[
                'week',                         // unit name
                [1]                             // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]],

            i = 0;

        for (i; i < dataLength; i += 1) {
            ohlc.push([
                kData[i].timestamp, // the date
                kData[i].open, // open
                kData[i].high, // high
                kData[i].low, // low
                kData[i].close // close
            ]);

            volume.push([
                kData[i].timestamp, // the date
                kData[i].volume // the volume
            ]);
        }


        // create the chart
        Highcharts.stockChart('chartContainer', {
            rangeSelector: {
                enabled: false
            },

            title: {
                text: null
            },

            navigator: {
                enabled: false
            },

            scrollbar:{
                // enabled: false
                liveRedraw:true,
            },

            credits: {
                enabled: false
            },

            xAxis: {
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%y-%m',
                    year: '%Y'
                }
            },

            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],

            tooltip: {
                followTouchMove: false,
                split: true
            },

            series: [{
                type: 'candlestick',
                name: 'AAPL',
                data: ohlc,
                color: 'green',
                lineColor: 'green',
                upColor: 'red',
                upLineColor: 'red',
                // dataGrouping: {
                //     units: groupingUnits
                // }
            }, {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
                // dataGrouping: {
                //     units: groupingUnits
                // }
            }]
        });
    }

    render() {
        return (
            <div id="container">
                <div id="menu">
                    <MenuButton text='M1'/>
                </div>
                <div id="chartContainer" ref={r => this.chart = r}></div>
            </div>
        )
    }
}