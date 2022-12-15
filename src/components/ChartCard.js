import React from 'react';
import { connect } from 'react-redux';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { countData } from '../utils/helpers'

const ChartCard = ({ data, chartConfig }) => {
  const compileData = (data, field, operation) => {
    if(operation === 'count'){
      return countData(field, data);
    }
  }
  
  switch (chartConfig.type){
    case 'pie': 
      return (
        <div className="chart">
          <h3>{chartConfig.title}</h3>
          <div>
            <Pie
              data={compileData(data, chartConfig.data_field, chartConfig.operation)}
              options={{

              }}
            />
          </div>
        </div>
      );
    case 'bar':
      return (
        <div className="chart">
          <h3>{chartConfig.title}</h3>
          <div>
            <Bar
              data={compileData(data, chartConfig.data_field, chartConfig.operation)}
              options={
                {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
                }
              }
            />
          </div>
        </div>
      )
    case 'line':
      return (
        <div className="chart">
          <h3>{chartConfig.title}</h3>
          <div>
            <Line
              data={compileData(data, chartConfig.data_field, chartConfig.operation)}
              options={{

              }}
            />
          </div>
        </div>
      );
    case 'card':
      return (
        <div className="chart">
          <h3>{chartConfig.title}</h3>
          <h4>{chartConfig.data_field}: {data.filter((x) => x[chartConfig.data_field]).length}</h4>
        </div>
      )
    default: 
      return (
        <div className="chart"></div>
      )
  }
}

const mapPropsToChartCard = (state) => {
  return {
    data: state.data
  };
}

export default connect(mapPropsToChartCard)(ChartCard);