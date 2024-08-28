// const BASE_URL = "https://jsonplaceholder.typicode.com/";

type Props = {
  id: number;
  title: string;
  body: string;
  count?: number;
  onTop: () => void;
};
const Post = (props: Props) => {
  console.log("Post redners:", props.title);

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid red",
      }}
    >
      <strong>Id: {props.id}</strong>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      {props.count && <p>{props.count}</p>}
      <button onClick={props.onTop}>OnTop</button>
    </div>
  );
};

export default Post;
