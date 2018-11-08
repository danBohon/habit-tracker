  import React, { Component } from 'react';
  import Chart from "react-apexcharts";
  
  export default class EnergyChart extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          options: {
            chart: {
              id: "24-hour-line"
            },
            xaxis: {
              categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24]
            }
          },
          series: [
            {
              name: "series-1",
              data: []
            }
          ]
        };
      }
         
      render() {
        return (
          <div className="app">
            <div className="row">
              <div className="mixed-chart">
                <Chart
                  options={this.state.options}
                  series={this.props.series}
                  type="line"
                  width="500"
                />
              </div>
            </div>
          </div>
        );
      }
    }
    