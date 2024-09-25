import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import Post from "../components/post";
import { PostModel } from "../types/Post";
import { fetchData } from "../utils/fectData";
import useApi from "../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchListPosts } from "../store/reducers/postReducer";
import { fetchListUsers } from "../store/reducers/usersReducer";
import { AddDispatch } from "../store";
import post from "../components/post";

// const post1 = {
//   userId: 1,
//   id: 1,
//   title:
//     "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
// };

// const post2 = {
//   userId: 1,
//   id: 2,
//   title: "eum et est occaecati",
//   body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
// };

// const post3 = {
//   userId: 1,
//   id: 3,
//   title: "nesciunt quas odio",
//   body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
// };

// const posts = [post1, post2, post3];

function ListPosts() {
  // const [postsData, setPostsData] = useState(posts);
  // const { data: postsData = [], setData: setPostsData } = useApi("/posts", []);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const totalTitleLength = useRef<number>(0); // ref
  const dispatch = useDispatch<AddDispatch>();
  const { auth, posts, users } = useSelector((state: any) => state);
  const postIds = posts.ids ?? [];
  const postsData = posts.data || {};
  const userData = users.data;
  const [editingPost, setEditingPost] = useState<{
    postId: null | number;
    editingField: null | "body" | "author";
  }>({
    postId: null,
    editingField: null,
  });
  console.log("auth", auth);
  console.log("posts", posts);

  useEffect(() => {
    dispatch(fetchListPosts());
    dispatch(fetchListUsers());
  }, [dispatch]);

  // const addPost = () => {
  //   setPostsData((prevPost) => [...prevPost, post1]);
  //   console.log(postsData);
  // };
  const addPost = useCallback(() => {
    // setPostsData((prevPost: any) => {
    //   if (prevPost) {
    //     return [...prevPost, post1];
    //   }
    //   return [post1];
    // });
    // if (totalTitleLength.current != null) {
    //   totalTitleLength.current += post1.title.length;
    // }
  }, []);

  // const handleOnTop = (id: number) => {
  //   const postToMove = postsData.find((post) => post.id === id);
  //   if (postToMove) {
  //     const updatedPosts = postsData.filter((post) => post.id !== id);
  //     setPostsData([postToMove, ...updatedPosts]);
  //   }
  // };

  // useEffect(() => {
  //   const fectchListPost = async () => {
  //     try {
  //       const listPost = await fetchData("/posts");
  //       setPostsData(listPost);
  //     } catch (err) {
  //       console.error("Error fecthing posts: ", err);
  //     }
  //   };
  //   fectchListPost();
  // });
  const handleIncrease = useCallback(() => {
    // re-render 1 time: batchupdate
    setCount(count + 1); // count 1: 2
    // setCount(count + 1);
    setCount((prevCount) => prevCount + 1); // count 3
    setTime(time + Date.now());
  }, [count, time, setCount, setTime]);

  const handleEdit = useCallback(
    (post: PostModel, editingField: "body" | "author") => {
      setEditingPost({
        postId: post.id,
        editingField,
      });
    },
    []
  );

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  if (posts.loading === "loading") {
    return <p>loading...</p>;
  }

  return (
    <div className="App">
      <p>Count: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      {/* <p style={{ color: 'green' }}>{total}</p> */}
      <button onClick={addPost}>Add post</button>
      {postIds.map((id: PostModel["id"]) => {
        const post = postsData[id];
        const postWithUser = post
          ? { ...post, name: userData[post.userId].name }
          : null;
        return postWithUser ? (
          <Post
            key={postWithUser.id} // 1, 2, 3 1,
            post={postWithUser}
            handleEdit={handleEdit}
            editingField={
              id === editingPost.postId ? editingPost.editingField : null
            }
            // postDetail={{ post: postWithUser, count: postsData.length }}
          />
        ) : null;
      })}
    </div>
  );
}

// prop & state
// prop: được quản lý ở phía parent
// state: Chỉ được điều khiển trong phạm vi component
export default ListPosts;
