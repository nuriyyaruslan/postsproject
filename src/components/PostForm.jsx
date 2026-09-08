import { useEffect, useState } from "react";

import {
  Button,
  Stack,
  TextField,
} from "@mui/material";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createPost,
  fetchPostById,
  updatePost,
} from "../store/postsSlice";

const PostForm = ({ editId, onSuccess }) => {
  const dispatch = useDispatch();

  const { selectedPost } = useSelector(
    (state) => state.posts
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editId) {
      dispatch(fetchPostById(editId));
    }
  }, [editId, dispatch]);

  useEffect(() => {
    if (selectedPost && editId) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    }
  }, [selectedPost, editId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editId) {
      await dispatch(
        updatePost({
          id: editId,

          post: {
            userId: 1,
            title,
            body,
          },
        })
      );
    } else {
      await dispatch(
        createPost({
          userId: 1,
          title,
          body,
        })
      );
    }

    setTitle("");
    setBody("");

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          fullWidth
        />

        <TextField
          label="Body"
          value={body}
          onChange={(event) =>
            setBody(event.target.value)
          }
          multiline
          rows={4}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
        >
          {editId
            ? "Update Post"
            : "Create Post"}
        </Button>
      </Stack>
    </form>
  );
};

export default PostForm;