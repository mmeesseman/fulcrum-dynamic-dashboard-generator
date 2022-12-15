import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import { selectForm, setForms, setLoading, logout, setStartDate, setEndDate, setDatePickerFocus } from '../actions/dashboardActions';
import moment from 'moment';
import { Client } from 'fulcrum-app';

const Header = ({forms, selectedForm, token, host, dispatch, startDate, endDate, datePickerFocus }) => {
  
  const getForms = async () => {
    try {
      dispatch(setLoading(true))
      const client = new Client(token, { baseURI: host })
      const forms = await client.forms.all();
      if (forms.objects) {
        dispatch(setForms(forms.objects.filter((form) => form.elements && form.elements[0].data_name === 'charts')));
        if(!selectedForm || forms.objects.map(x => x.id).indexOf(selectedForm.id) === -1 ) {
          dispatch(selectForm(
            forms.objects.filter((form) => form.elements && form.elements[0].data_name === 'charts') && forms.objects.filter((form) => form.elements && form.elements[0].data_name === 'charts') && forms.objects.filter((form) => form.elements && form.elements[0].data_name === 'charts')[0]
          ));
        }
        dispatch(setLoading(false)); 
      }
    } catch (e) {
      dispatch(setLoading(false)); 
      console.log(e)
    }
  };
  
  useEffect( () => { 
    getForms(); 
  } , [token, host])

  const handleOnClick = (e) => {
    dispatch(logout())
  }

  const onDatesChange = (startDate, endDate) => {
    dispatch(setStartDate(startDate.valueOf()));
    dispatch(setEndDate(endDate.valueOf()));
  }

  const handleSelectedOption = (e) => {
    const selectedOption = document.getElementById('appSelector').options[e.target.selectedIndex].value
    dispatch(selectForm(forms.find((x) => x.id === selectedOption)))
  }
  return (
    <div className="header">
      <h1>Fulcrum Dashboard Generator</h1>
      <select id="appSelector" onChange={handleSelectedOption} value={selectedForm.id}>
        { forms && forms.length > 0 ? forms.map((form, i) => <option key={i} value={form.id}>{form.name}</option>) : <option key="999" value="999">No Apps with Chart Config</option> }
      </select>
      <DateRangePicker
        startDate={moment(startDate)}
        startDateId="your_unique_start_date_id"
        endDate={moment(endDate)}
        endDateId="your_unique_end_date_id"
        onDatesChange={({startDate, endDate}) => onDatesChange(startDate, endDate)}
        focusedInput={datePickerFocus}
        onFocusChange={ focusedInput => dispatch(setDatePickerFocus(focusedInput)) } 
        isOutsideRange={(day) => false}
      />
      <button onClick={handleOnClick}>Logout</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    forms: state.forms,
    selectedForm: state.selectedForm,
    token: state.token,
    host: state.host,
    startDate: state.startDate,
    endDate: state.endDate,
    datePickerFocus: state.datePickerFocus
  };
}

export default connect(mapStateToProps)(Header);

