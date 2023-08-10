import React, { useState, useEffect, useCallback } from "react";
import Cardcomms from "./Cardcomms";
import { Comment } from "../models/commentType";

const TableLogic = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [limit, setLimitstate] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAPI();
  }, [limit]);

  let skip = 0;
  async function fetchAPI() {
    try {
      setIsLoading(true);
      const url = `https://dummyjson.com/comments?skip=${skip}&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data.comments);
      setIsLoading(false);
    } catch (err) {
      console.log("Request Failed", err);
      setIsLoading(false);
    }
  }

  const handleScroll = () => {
    if (!isLoading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 500) {
      setLimitstate(limit + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
