import React, { Component } from 'react';
import Chart from "react-apexcharts";

export default class HabitChart extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
        chart: {
          height: 440,
          width: 440,
          type: 'radialBar',
      },
      plotOptions: {
          radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                  background: "#e7e7e7",
                  strokeWidth: '97%',
                  margin: 5, // margin is in pixels
                  shadow: {
                      enabled: true,
                      top: 2,
                      left: 0,
                      color: '#999',
                      opacity: 1,
                      blur: 2
                  }
              },
              dataLabels: {
                  name: {
                      show: false
                  },   
                  value: {
                      offsetY: -3,
                      fontSize: '22px'
                  }                     
              }
          }
      },
      fill: {
          gradient: {
              enabled: true,
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
          },
      },
      series: [76],
      labels: ['Average Results'] 
    }
  }
  
    render() {
      return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="line"
                width="500"
              />
            </div>
          </div>
        </div>
      );
    }
  }
