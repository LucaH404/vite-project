import React from 'react'
import { Card } from 'antd';
import { Comment } from "../models/commentType";

interface CustomTableProps {
  comments: Comment[];
  handleInc: (limit: number) => void;
  count: number;
  show: boolean;
  limit: number;
}
const Cardcomms: React.FC<CustomTableProps> = ({ 
  comments,
  handleInc,
  count,
  show,
  limit
}) => {
  return (
    <>
      {comments.map((comment) => (
        <Card title={comment.user.username} bordered={false} style={{ width: 300 }}>
          <p>{comment.body}</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      ))}
    </>
  )
}

export default Cardcomms