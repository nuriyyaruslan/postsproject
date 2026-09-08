import { useEffect } from "react";

import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchComments,
} from "../store/postsSlice";

const Comments = ({ postId }) => {
  const dispatch = useDispatch();

  const comments = useSelector(
    (state) => state.posts.comments
  );

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId, dispatch]);

  return (
    <>
      <Typography variant="h6">
        Comments
      </Typography>

      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText
              primary={comment.name}
              secondary={comment.body}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Comments;