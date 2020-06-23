import React, { Component } from 'react';
import Chart from 'chart.js';

export default class CardBody extends Component {
    // eslint-disable-next-line react/sort-comp
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        // eslint-disable-next-line react/prop-types
        const { prices } = this.props;
        const labels = [];

        for (let i = 1; i <= prices.length; i++) {
            labels.push(i);
        }
        const myChartRef = this.chartRef.current.getContext('2d');

        // eslint-disable-next-line no-new
        new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: '#000',
                        borderColor: '#000',
                        fill: false,
                        data: [...prices],
                    }
                ]
            },
            options: {
                animation: {
                    duration: 0
                },
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                response: true,
                scales: {
                    xAxes: [{
                        display: true,
                    }],
                    yAxes: [{
                        display: true,
                    }]
                }
            }
        });
    }

    render() {
        return (
          <div className="card-body">
                <canvas id="myChart" ref={this.chartRef}/>
          </div>
        );
    }
}

