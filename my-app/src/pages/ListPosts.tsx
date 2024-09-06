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
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const post1 = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};

const post2 = {
  userId: 1,
  id: 2,
  title: "eum et est occaecati",
  body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
};

const post3 = {
  userId: 1,
  id: 3,
  title: "nesciunt quas odio",
  body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
};

const posts = [post1, post2, post3];
function ListPosts() {
  // const [postsData, setPostsData] = useState(posts);
  const { data: postsData = [], setData: setPostsData } = useApi("/posts", []);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const totalTitleLength = useRef<number>(0); // ref
  const auth = useSelector((state: any) => state.auth);

  // const addPost = () => {
  //   setPostsData((prevPost) => [...prevPost, post1]);
  //   console.log(postsData);
  // };
  const addPost = useCallback(() => {
    setPostsData((prevPost: any) => {
      if (prevPost) {
        return [...prevPost, post1];
      }
      return [post1];
    });
    if (totalTitleLength.current != null) {
      totalTitleLength.current += post1.title.length;
    }
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
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div className="App">
      <p>Count: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      {/* <p style={{ color: "green" }}>{total}</p> */}
      <button onClick={addPost}>Add post</button>
      {postsData.map((post: PostModel) =>
        post ? (
          <Post
            key={post.id} // 1, 2, 3 1,
            postDetail={{ post, count: postsData.length }}
            // title={post.title}
            // body={post.body}
            // id={post.id}
            // count={postsData.length}
          />
        ) : null
      )}
    </div>
  );
}

// prop & state
// prop: được quản lý ở phía parent
// state: Chỉ được điều khiển trong phạm vi component
export default ListPosts;
