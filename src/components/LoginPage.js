import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { instances } from '../fixtures/fulcrumInstances';
import { setToken, setLoading, setHost } from '../actions/dashboardActions';

const LoginPage = ({ dispatch, host }) => {
  const [ orgs, setOrgs ] = useState([]);
  
  const getUserOrgs = async (email, pass, host) => {
    dispatch(setLoading(true));
    const response = await axios.get(`${host}/users.json`, {
      headers: {
        'Authorization': `Basic ${new Buffer.from(email + ':' + pass).toString('base64')}`,
        'Accept': 'application/json'
      }
    })
    dispatch(setLoading(false));
    return response.data.user.contexts;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("loginForm"))
    const creds = Object.fromEntries(formData);
    const selectedInstance = document.getElementById('selectInstance').value
    dispatch(setHost(selectedInstance));
    const userOrgs = await getUserOrgs(creds.email, creds.password, selectedInstance);
    setOrgs(userOrgs);
  }

  const handleOrgSubmit = (e) => {
    e.preventDefault();
    const selectedOrg = document.getElementById('selectOrg').value
    dispatch(setToken(selectedOrg))
  }

  return (
    <div className="login-page">  
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="selectInstance">Choose Instance</label>
        <select id="selectInstance">
          {instances.map((instance) => {
            return <option key={instance.host} value={instance.host}>{instance.name}</option>
          })}
        </select>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password" />
        <button type="submit">Login</button>
      </form>
      {host !== '' ? 
        <form id="orgSumbit" onSubmit={handleOrgSubmit}>
          <label htmlFor="selectOrg">Choose an Org</label>
          <select id="selectOrg">
            {orgs && orgs.map((org) => {
              return <option key={org.api_token} value={org.api_token}>{org.name}</option>
            })}
          </select>
          <button type="submit">Select Org</button>
        </form> 
        : '' 
      }
    </div>
  )
}

const mapPropsToLogin = (state) => {
  return {
    loading: state.loading,
    host: state.host
  }
}

export default connect(mapPropsToLogin)(LoginPage);