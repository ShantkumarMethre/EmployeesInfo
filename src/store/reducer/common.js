import * as ActionTypes from '../../action/types';

const initialState = {
  isLoading: false,
};

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.LOADING_START:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
