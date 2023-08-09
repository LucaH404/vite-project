import { useState, useEffect, useCallback } from "react";
import Cardcomms from "./Cardcomms";
import { Comment } from "../models/commentType";
// import "./Table.css";
// import CustomTable from "./CustomTable";
//fare due componenti diversi, uno con la logica e l'altro solo con l'html, 
const TableLogic = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [limit, setLimitstate] = useState(10)
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
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
  const hideBtn = useCallback(() => {
      setShow(true);
      setTimeout(() => {
        setShow(false); 
      }, 1000);
    }, []);
  const handleInc = useCallback ((limit : number) => {
      hideBtn();
      setLimitstate(limit + 10);
      setCount(count + 1)
  }, [limit])

  return (
    <div>
      {<Cardcomms
       comments={comments}
       handleInc={handleInc}
       count={count}
       show={show}
       limit={limit}
      />}
    </div>
  );
};

export default TableLogic;
