import React from "react";

export interface User {
    id: number;
    username: string;
}
  
export interface Comment {
    id: number;
    body: string;
    postId: number;
    user: User;
}

