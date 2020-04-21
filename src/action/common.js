import * as ActionTypes from './types';

export const startLoading = dispatch =>
  dispatch({type: ActionTypes.LOADING_START});
export const stopLoading = dispatch =>
  dispatch({type: ActionTypes.LOADING_STOP});
