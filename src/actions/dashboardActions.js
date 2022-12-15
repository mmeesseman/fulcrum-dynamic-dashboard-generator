export const setForms = (forms = []) => ({
  type: 'SET_FORMS',
  forms
});

export const selectForm = (selectedForm = {}) => ({
  type: 'SELECT_FORM',
  selectedForm
});

export const setFormData = (data = []) => ({
  type: 'SET_DATA',
  data
});

export const setToken = (token = '') => ({
  type: 'SET_TOKEN',
  token
});

export const setHost = (host = '') => ({
  type: 'SET_HOST',
  host
})

export const logout = () => ({
  type: 'LOGOUT',
  client: ''
});

export const setLoading = (loading = false) => ({
  type: 'SET_LOADING',
  loading
})

export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

export const setDatePickerFocus = (datePickerFocus = null) => ({
  type: 'SET_DATE_PICKER_FOCUS',
  datePickerFocus
})