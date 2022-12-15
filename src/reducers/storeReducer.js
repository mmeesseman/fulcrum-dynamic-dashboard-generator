import moment from 'moment';

const defaultState = {
  forms: [],
  selectedForm: {},
  data: [],
  client: '',
  host: '',
  startDate: moment().subtract(1, 'month').valueOf(),
  endDate: moment().valueOf(),
  datePickerFocus: null
};

export const storeReducer = (state = defaultState, action) => {
  switch (action.type){
    case 'SET_FORMS':
      return {
        ...state,
        forms: action.forms
      };
    case 'SELECT_FORM':
      return {
        ...state,
        selectedForm: action.selectedForm
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.data
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_HOST':
      return {
        ...state,
        host: action.host
      }
    case 'LOGOUT':
      return defaultState;
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
      case 'SET_END_DATE':
        return {
          ...state,
          endDate: action.endDate
        }
      case 'SET_DATE_PICKER_FOCUS':
        return {
          ...state,
          datePickerFocus: action.datePickerFocus
        }
    default:
      return state;
  }
}