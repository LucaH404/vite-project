import { useState, useEffect, useCallback } from "react";
import Cardcomms from "./Cardcomms";
import { Comment } from "../models/commentType";
// import "./Table.css";
// import CustomTable from "./CustomTable";

const TableLogic = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [limit, setLimitstate] = useState(10)
  const [show, setShow] = useState(false)
  const [isScrolled, setisScrolled] = useState(false)

  useEffect(() => {
      fetchAPI();
    }, [limit]); 

  let skip = 0;
  async function fetchAPI() {
    try {
      const url = `https://dummyjson.com/comments?skip=${skip}&limit=${limit}`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data.comments)
    } catch (err) {
      console.log("Request Failed", err);
    }
  }

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 500
    ) {
      // fetchData();
      setLimitstate(limit + 10);
      console.log(limit);
      console.log(window.innerHeight);
      setisScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setisScrolled(false)
      console.log(isScrolled, limit)
    };
  }, [isScrolled]);

  return (
    <div>
      {<Cardcomms
       comments={comments}
       limit={limit}
      />}
    </div>
  );
};

export default TableLogic;
