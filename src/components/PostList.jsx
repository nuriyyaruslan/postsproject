import { useEffect } from "react";

import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
    deletePost,
    fetchPosts,
} from "../store/postsSlice";

const PostList = ({ onEdit, onDetails }) => {
    const dispatch = useDispatch();

    const {
        posts,
        loading,
        error,
    } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deletePost(id));
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    return (
        <Grid container spacing={2}>
            {posts.map((post) => (
                <Grid
                    // item
                    xs={12}
                    md={6}
                    key={post.id}
                >
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                {post.title}
                            </Typography>

                            <Typography color="text.secondary">
                                {post.body}
                            </Typography>
                        </CardContent>

                        <CardActions>

                            <Button
                                size="small"
                                onClick={() => onDetails(post.id)}
                            >
                                Details
                            </Button>

                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => onEdit(post.id)}
                            >
                                Edit
                            </Button>

                            <Button
                                size="small"
                                color="error"
                                onClick={() => handleDelete(post.id)}
                            >
                                Delete
                            </Button>

                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PostList;