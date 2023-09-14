import React, { useState, useEffect, useCallback } from "react";
import Cardcomms from "./Cardcomms";
import { Comment } from "../models/commentType";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { RootState, fetchCommentsFailure, fetchCommentsRequest, fetchCommentsSuccess, store, storeComments } from "../app/store";

  

const TableLogic = () => {
  const [commentsState, setComments] = useState<Comment[]>([]);
  const [limit, setLimitstate] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTotal, setDataTotal] = useState(0);
  const [skip, setSkip] = useState(0);
 
  const commentsRedux = useSelector((state: RootState) => state.commentsRedux);
  const url = `https://dummyjson.com/comments?skip=${skip}&limit=${limit}`;

  const fetchComments = () => {
    return (dispatch: any) => {
      setIsLoading(true)
      dispatch(fetchCommentsRequest())
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const comments = data.comments
        setDataTotal(data.total)
        dispatch(fetchCommentsSuccess(comments));
        setComments(comments)
        setIsLoading(false)
      })
      .catch((error) => {
        dispatch(fetchCommentsFailure(error.message));
      });
    }
  } 
 
  const handleScroll = useCallback(() => {
    if (!isLoading && skip < dataTotal) {
      let cap = 0
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
        setSkip(prev => {
          const skipCap = prev + limit;
          if ((dataTotal - skip) < limit){
            cap = dataTotal - skip
          }
          return Math.min(skipCap, dataTotal - cap);
        }); 
      }
    }
  }, [limit, dataTotal, isLoading, skip]);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    store.dispatch(fetchComments())
    setComments(prevCommentsRedux => [...prevCommentsRedux, ...commentsRedux]);
  }, [limit, skip]);

  return (
    <div>
      {<Cardcomms comments={commentsState} limit={limit} />}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
export default TableLogic;