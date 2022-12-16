import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ChartCard from './ChartCard'
import { setFormData, setLoading } from '../actions/dashboardActions';
import moment from 'moment';
import { Client } from 'fulcrum-app';

const Dashboard = ({ dispatch, selectedForm, token, host, startDate, endDate }) => {
  const runQuery = async () => {
    try {
      dispatch(setLoading(true));
      const client = new Client(token, { baseURI: host });
      const data = await client.query(`SELECT * FROM "${selectedForm.id}" WHERE _created_at BETWEEN '${moment(startDate).format('YYYY-MM-DD')}' AND '${moment(endDate).format('YYYY-MM-DD')}' ORDER BY _created_at`)
      if (data && data.rows) {
        dispatch(setFormData(data.rows));
        dispatch(setLoading(false));
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log(e)
    }
  }

  useEffect( () => { runQuery() }, [selectedForm, startDate, endDate])
  const chartConfigs = selectedForm && selectedForm.elements && selectedForm.elements[0].data_name === 'charts' ? selectedForm.elements[0].label : undefined;
  
  return (
    <div className="dashboard">
      <h1>{selectedForm.name}</h1>
      <div className="charts">
        {
          chartConfigs ? JSON.parse(chartConfigs).map((chartConfig, i) => <ChartCard key={i} chartConfig={chartConfig} />) : <p>Chart Config Not Found</p>
        }
      </div>
    </div>
  );
}

const mapPropsToDashboard = (state) => {
  return {
    selectedForm: state.selectedForm,
    token: state.token,
    host: state.host, 
    startDate: state.startDate,
    endDate: state.endDate
  };
}

export default connect(mapPropsToDashboard)(Dashboard);