const defaultState = {
  movies: [],
  searchStr: '',
  error: ''
};

export default function movieReducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_MOVIES_FULFILLED': {
      console.log(`Fulfilled ${payload}`);
      if (payload.status === 200) {
        return {
          ...state,
          movies: payload.data,
          error: ''
        };
      }
      console.log('but no results');
      return {
        ...state,
        searchStr: '',
        error: 'No matches found'
      };
    }
    case 'GET_MOVIES_REJECTED': {
      console.log(`Rejected ${payload.data}`);
      return {
        ...state,
        movies: [],
        error: 'There was a problem with your request'
      };
    }
    case 'SET_SEARCH': {
      return {
        ...state,
        searchStr: payload
      };
    }
    default:
      return state;
  }
}
