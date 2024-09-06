/** @format */
import { memo, useContext } from "react";
import { Link } from "react-router-dom";

interface PostModel {
  title: string;
  body: string;
  id: number;
  userId: number;
}
type Props = {
  // count?: number;
  postDetail: {
    post: PostModel;
    count?: number;
  };
};

const Post = ({ postDetail }: Props) => {
  console.log("post render ", postDetail.post.id);
  return (
    <div>
      <Link to={"post/" + postDetail.post.id}>
        <strong>{postDetail.post.title}</strong>
      </Link>
      <p>{postDetail.post.body}</p>
      {/* {count && <p>{count}</p>} */}
    </div>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.postDetail.post.title === nextProps.postDetail.post.title;
};

export default memo(Post, arePropsEqual); // shallow compare
