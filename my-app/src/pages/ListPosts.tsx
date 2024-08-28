import React, { useState } from "react";
import Post from "../components/post";
import { log } from "console";

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
  const [postsData, setPostsData] = useState(posts);
  const [count, setcCount] = useState(postsData.length);
  const addPost = () => {
    setPostsData((prevPost) => [...prevPost, post1]);
    console.log(postsData);
  };
  const handleOnTop = (id: number) => {
    const postToMove = postsData.find((post) => post.id === id);
    if (postToMove) {
      const updatedPosts = postsData.filter((post) => post.id !== id);
      setPostsData([postToMove, ...updatedPosts]);
    }
  };
  return (
    <div className="App">
      <p>Count: {postsData.length}</p>
      <button onClick={addPost}>Add Post</button>
      <button onClick={() => setcCount(count + 1)}>Increase</button>

      {postsData.map((post) => (
        <Post
          id={post.id}
          title={post.title}
          body={post.body}
          count={postsData.length}
          onTop={() => handleOnTop(post.id)}
        />
      ))}
    </div>
  );
}

// prop & state
// prop: được quản lý ở phía parent
// state: Chỉ được điều khiển trong phạm vi component
export default ListPosts;
