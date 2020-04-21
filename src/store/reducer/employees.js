import * as ActionTypes from '../../action/types';

const initialState = {
  employeesList: [],
  selectedEmployees: {},
  phoneNummberLength: 10,
  coords: {},
  avatar: '',
};

export default function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_EMPLOYEES:
      return action.payload;
    case ActionTypes.DELET_EMPLOYEES:
      return action.payload;
    case ActionTypes.FETCH_EMPLOYEES:
      return action.payload;
    default:
      return state;
  }
}
