import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const initialState = {
  commentsRedux: [], 
  error: '',
}
export type RootState = {
  commentsRedux: [], 
  error: string,
};

const FETCH_COMMENTS_REQUESTED = 'FETCH_COMMENTS_REQUESTED'
const FETCH_COMMENTS_SUCCEEDED = 'FETCH_COMMENTS_SUCCEEDED'
const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED'

export const fetchCommentsRequest = () => {
  return {
    type: FETCH_COMMENTS_REQUESTED,
  }
}

export const fetchCommentsSuccess = (commentsRedux : []) =>{
  return {
    type: FETCH_COMMENTS_SUCCEEDED,
    payload: commentsRedux,
  }
}

export const fetchCommentsFailure = (error : any) => {
  return {
    type: FETCH_COMMENTS_FAILED,
    payload: error,
  }
} 

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUESTED:
      return {
        ...state,
      };
    case FETCH_COMMENTS_SUCCEEDED:
      return {
        ...state,
        commentsRedux: action.payload,
        error: '',
      };
    case FETCH_COMMENTS_FAILED:
      return {
        ...state,
        commentsRedux: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});

export const storeComments = (state: RootState) => state.commentsRedux;