import React, { useState, useEffect, useCallback } from "react";
import Cardcomms from "./Cardcomms";
import { Comment } from "../models/commentType";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const TableLogic = () => {
  const [commentsState, setComments] = useState<Comment[]>([]);
  const [limit, setLimitstate] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTotal, setDataTotal] = useState(0);
  const [skip, setSkip] = useState(0);
    const url = `https://dummyjson.com/comments?skip=${skip}&limit=${limit}`;

  // useEffect(() => {
  //   fetchAPI();
  // }, [limit, skip]);

  // async function fetchAPI() {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setComments(prevComments => [...prevComments, ...data.comments]);
  //     setIsLoading(false);
  //     setDataTotal(data.total);
  //   } catch (err) {
  //     console.log("Request Failed", err);
  //     setIsLoading(false);
  //   }
  // }
// const handleScroll = useCallback(() => {
//   if (!isLoading && skip < dataTotal) {
//     let cap = 0
//     if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
//       setSkip(prev => {
//         const skipCap = prev + limit;
//         if ((dataTotal - skip) < limit){
//           cap = dataTotal - skip
//         }
//         return Math.min(skipCap, dataTotal - cap);
//       });
//     }
//   }
// }, [limit, dataTotal, isLoading, skip]);



  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     console.log('limit ' + limit + 'skip ' + skip)
  //   };
  // }, [isLoading]);

  //REDUX
  const initialState = {
    loading: false,
    commentsRedux: [], 
    error: '',
  }
  const FETCH_COMMENTS_REQUESTED = 'FETCH_COMMENTS_REQUESTED'
  const FETCH_COMMENTS_SUCCEEDED = 'FETCH_COMMENTS_SUCCEEDED'
  const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED'
  
  const fetchCommentsRequest = () => {
    return {
      type: FETCH_COMMENTS_REQUESTED,
    }
  }

  const fetchCommentsSuccess = (commentsRedux : []) =>{
    return {
      type: FETCH_COMMENTS_SUCCEEDED,
      payload: commentsRedux,
    }
  }

  const fetchCommentsFailure = (error : any) => {
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
          loading: true,
        };
      case FETCH_COMMENTS_SUCCEEDED:
        return {
          ...state,
          loading: false,
          commentsRedux: action.payload,
          error: '',
        };
      case FETCH_COMMENTS_FAILED:
        return {
          ...state,
          loading: false,
          commentsRedux: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  const store = configureStore({
    reducer: reducer,
    middleware: [thunk]
  });

  const fetchComments = () => {
    return (dispatch: any) => {
      dispatch(fetchCommentsRequest())
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        // console.log(commentsState)
        const comments = data.comments.map((comment: any) => comment.id);
        setComments(data.comments)
        dispatch(fetchCommentsSuccess(comments));
      })
      .catch((error) => {
        dispatch(fetchCommentsFailure(error.message));
      });
    }
  }
  // store.subscribe(() => {console.log(store.getState())})
  store.dispatch(fetchComments())
  //FINE REDUX
  return (
    <div>
      {<Cardcomms comments={commentsState} limit={limit} />}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
export default TableLogic;
