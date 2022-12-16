import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import LoadingOverlay from 'react-loading-overlay';
LoadingOverlay.propTypes = undefined

const DashboardGenerator = ({ token = '', loading }) => {
  if (token === '') {
    return (
      <LoadingOverlay
        active={loading}
        text='Loading'
        spinner={true}
      >
          <LoginPage />
      </LoadingOverlay>
    )
  } else {
    return ( 
      <LoadingOverlay
        active={loading}
        text='Loading'
        spinner={true}
      >
          <div>
            <Header />
            <Dashboard/>
          </div>
      </LoadingOverlay>
    );
  }
}

const mapPropsToDashboardGenerator = (state) => {
  return {
    token: state.token,
    loading: state.loading
  };
}

export default connect(mapPropsToDashboardGenerator)(DashboardGenerator);