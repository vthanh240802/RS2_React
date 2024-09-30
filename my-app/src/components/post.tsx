/** @format */
import { ChangeEvent, memo, useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EDIT_POST } from "../store/action";
type InputField = "body" | "author";

interface PostModel {
  title: string;
  body: string;
  id: number;
  userId: number;
  name?: string;
}
type Props = {
  post: PostModel;
  editingField?: InputField | null;
  handleEdit: (post: PostModel, editingField: InputField) => void;
};

const Post = ({ post, editingField, handleEdit }: Props) => {
  console.log("post render ", post.id);

  const [changingInput, setChangingInput] = useState({
    author: post.name,
    body: post.body,
  });

  const dispatch = useDispatch();
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>, field: InputField) => {
      setChangingInput((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
      dispatch({
        type: EDIT_POST,
        changingInput,
        postId: post.id,
      });
    },
    []
  );

  // const hanleSave = useCallback(() => {
  //   dispatch({
  //     type: EDIT_POST,
  //     changingInput,
  //     postId: post.id,
  //     userId: post.userId,
  //   });
  //   setEdingField(null);
  // }, [dispatch, changingInput, post.id, setEdingField, post.userId]);
  return (
    <div>
      <Link to={"post/" + post.id}>
        <strong>{post.title}</strong>
      </Link>
      <div>
        {editingField === "body" ? (
          <>
            <input
              type="text"
              value={changingInput[editingField]}
              onChange={(e) => handleChangeInput(e, "body")}
            />
            {/* <button onClick={() => hanleSave()}>Save</button> */}
          </>
        ) : (
          <p onDoubleClick={() => handleEdit(post, "body")}>{post.body}</p>
        )}
      </div>
      {editingField === "author" ? (
        <>
          <input
            type="text"
            value={changingInput[editingField]}
            onChange={(e) => handleChangeInput(e, "author")}
          />
          {/* <button onClick={() => hanleSave()}>Save</button> */}
        </>
      ) : (
        post.name && (
          <i onDoubleClick={() => handleEdit(post, "author")}>
            Author: {post.name}
          </i>
        )
      )}
    </div>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.post.body === nextProps.post.body &&
    prevProps.post.name === nextProps.post.name &&
    prevProps.editingField === nextProps.editingField
  );
};

export default memo(Post, arePropsEqual); // shallow compare
