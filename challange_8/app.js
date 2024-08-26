console.log("Hello");

console.log("print 1");

Promise.resolve().then(() => {
  console.log("Print 2");
});
console.log("Print 3");

// uu tien microtask hon la taskquece

// 1 3 6 2 7 5 4

/**
 * 2: success
 * 4: client issue 404 (Lỗi client)
 * 5: server error (Lỗi server)
 * 3: navtigation
 **/


// async function fetchUserById(userId) {
//   const response = await fetch(BASE_URL + "/users/" + userId);
//   if (response.status !== 200) {
//     throw new Error("Error");
//   }
//   const user = await response.json();
//   return user;
// }

// fetchUserById(2).then((user) => console.log("User@ ", user));

// Challenge 8:
/**
* url: posts:: https://jsonplaceholder.typicode.com/posts
* users: https://jsonplaceholder.typicode.com/users
* 
* 1. fetch posts and users
* 2. return data following the below format
* [{
* 	id: 1,
		title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		body: "quia et suscipi suscipit recusandae consequuntur expedita et cum ",
		author: "Leanne Graham",
* }, {}, {}]
*/

const BASE_URL = "https://jsonplaceholder.typicode.com/";

async function fetchUser() {
  const response = await fetch(BASE_URL + "/users", { method: "GET" });
  if (response.status !== 200) {
    throw new Error("Error");
  }
  const users = await response.json();
  return users;
}

async function fectchPost() {
  const response = await fetch(BASE_URL + "/posts", { method: "GET" });
  if (response.status !== 200) {
    throw new Error("Error");
  }
  const posts = await response.json();
  return posts;
}

function handlePosts() {
  Promise.all([fetchUser(), fectchPost()])
    .then(([users, posts]) => {
      const results = posts.map((post) => {
        const author = users.find((user) => user.id === post.userId).name;
        return {
          id: post.id,
          title: post.title,
          body: post.body,
          author: author,
        };
      });
      console.log(results);
    })
    .catch((error) => console.log("Error", error));
}
handlePosts();
