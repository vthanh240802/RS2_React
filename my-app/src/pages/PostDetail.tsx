import { useEffect, useState } from "react";
import { PostModel } from "../types/Post";
import { fetchData } from "../utils/fectData";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";

const PostDetail = () => {
  const { postId } = useParams() || {};
  const { data: post, setData: setPost } = useApi("/posts/" + postId, null);
  // useEffect(() => {
  //   const fectchPost = async () => {
  //     try {
  //       const postDetail = await fetchData("/posts/" + postId);
  //       setPost(postDetail);
  //     } catch (err) {
  //       console.error("Error fecthing posts: ", err);
  //     }
  //   };
  //   fectchPost();
  // });
  if (!post) {
    return null;
  }

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;
