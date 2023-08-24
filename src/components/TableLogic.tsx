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
  
  // let dataTotal = 0;
  async function fetchAPI() {
    try {
      setIsLoading(true);
      const url = `https://dummyjson.com/comments?skip=${skip}&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data.comments);
      setIsLoading(false);
      setDataTotal(prev => data.total)
      // console.log(dataTotal)
    } catch (err) {
      console.log("Request Failed", err);
      setIsLoading(false);
    }
  }
//
const handleScroll = useCallback(() => {
  if (limit || skip < dataTotal) {
    if (!isLoading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 500) {
      // // setLimitstate(prev => {
      // //   const limitCap = prev + 10;
      // //   return Math.min(limitCap, dataTotal);
      // });
    setSkip(prev => {
        const skipCap = prev += limit;
        return Math.min(skipCap, dataTotal - limit);
      });
    skip === dataTotal - limit ? null : window.scrollTo(0, 0)
    }
  }
}, [limit, dataTotal, isLoading, skip]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // console.log('datatotal ' + dataTotal)
      console.log('limit ' + limit + 'skip ' + skip)

      // console.log('commenti: '+ (comments.length))
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

//impedire che superati i 340 elementi l'api continui a fare chiamate 