import * as ActionTypes from './types';
import ApiService from '../service/api_services';
import {APIConstants} from '../service/api_constant';
import {startLoading, stopLoading} from './common';

export const startImageLoader = () => async (dispatch, getState) => {
  var employeesState = {...getState().employees};

  dispatch(startLoading);
};
export const stopImageLoader = url => async (dispatch, getState) => {
  var employeesState = {...getState().employees};
  employeesState.avatar = url;
  dispatch({type: ActionTypes.FETCH_EMPLOYEES, payload: employeesState});
  dispatch(stopLoading);
};

export const fetchEmployees = () => async (dispatch, getState) => {
  var employeesState = {...getState().employees};

  dispatch(startLoading);

  const URL = APIConstants.EMPLOYEES_URL;
  const request = {
    url: URL,
    method: 'get',
  };
  const response = await ApiService.get(request);
  var arrlist = [];
  arrlist = response.data;
  var data = arrlist.reverse();
  employeesState.employeesList = data;

  console.log('employees is.', response.data);
  dispatch({type: ActionTypes.FETCH_EMPLOYEES, payload: employeesState});
  dispatch(stopLoading);
};

/**
 *
 * @param {object} object account object
 */
export const createEmployees = object => async (dispatch, getState) => {
  var employeesState = {...getState().employees};
  dispatch(startLoading);
  var employeesData = {
    Id: 55,
    name: object.FirstName.trim(),
    companyName: object.CompanyName.trim(),
    email: object.Email.trim(),
    phone: object.Phone,
    current_location: '',
    avatar: employeesState.avatar,
    currentLocation: employeesState.coords,
  };
  const postRequest = {
    url: APIConstants.EMPLOYEES_URL,
    params: employeesData,
    method: 'post',
  };
  await ApiService.create(postRequest);

  const URL = APIConstants.EMPLOYEES_URL;
  const request = {
    url: URL,
    method: 'get',
  };
  const response = await ApiService.get(request);
  var arrlist = [];
  arrlist = response.data;
  var data = arrlist.reverse();
  employeesState.employeesList = data;

  console.log('employees is.', response.data);
  dispatch({type: ActionTypes.FETCH_EMPLOYEES, payload: employeesState});
  dispatch(stopLoading);
};

/**
 *
 * @param {object} object account object
 */
export const getCoords = object => (dispatch, getState) => {
  var employeesState = {...getState().employees};

  employeesState.coords = object;

  dispatch({type: ActionTypes.FETCH_EMPLOYEES, payload: employeesState});
};

export const getEmployeeDetails = item => (dispatch, getState) => {
  var employeesState = {...getState().employees};

  employeesState.selectedEmployees = item;

  dispatch({type: ActionTypes.FETCH_EMPLOYEES, payload: employeesState});
};
