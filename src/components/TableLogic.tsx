import React, { useState, useEffect, useCallback } from "react";
import Cardcomms from "./Cardcomms";
import { Comment } from "../models/commentType";

const TableLogic = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [limit, setLimitstate] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTotal, setDataTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  
  useEffect(() => {
    fetchAPI();
  }, [limit, skip]);
  
  async function fetchAPI() {
    try {
      setIsLoading(true);
      const url = `https://dummyjson.com/comments?skip=${skip}&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(prevComments => [...prevComments, ...data.comments]);
      setIsLoading(false);
      setDataTotal(data.total);
    } catch (err) {
      console.log("Request Failed", err);
      setIsLoading(false);
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
      console.log('limit ' + limit + 'skip ' + skip)
    };
  }, [isLoading]);

  return (
    <div>
      {<Cardcomms comments={comments} limit={limit} />}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
export default TableLogic;
