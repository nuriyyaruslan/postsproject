import { useEffect } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { fetchPostById } from "../store/postsSlice";

const PostDetails = ({ postId }) => {
  const dispatch = useDispatch();

  const {
    selectedPost,
    loading,
    error,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
  }, [postId, dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  if (!selectedPost) {
    return null;
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5">
          {selectedPost.title}
        </Typography>

        <Typography
          sx={{ mt: 2 }}
          color="text.secondary"
        >
          {selectedPost.body}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          User ID: {selectedPost.userId}
        </Typography>

        <Typography>
          Post ID: {selectedPost.id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostDetails;