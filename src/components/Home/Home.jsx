import { useState } from "react";

import {
  Container,
  Divider,
  Typography,
} from "@mui/material";

import PostForm from "../../components/PostForm";
import PostList from "../../components/PostList";
import PostDetails from "../../components/PostDetails";
import Comments from "../../components/Comments";

function Home() {

    const [editId, setEditId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const handleSuccess = () => {
        setEditId(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography variant="h3" gutterBottom>
                Posts CRUD
            </Typography>

            <PostForm
                editId={editId}
                onSuccess={handleSuccess}
            />

            <Divider sx={{ my: 4 }} />

            <PostList
                onEdit={(id) => setEditId(id)}
                onDetails={(id) => setSelectedId(id)}
            />

            {selectedId && (
                <>
                    <Divider sx={{ my: 4 }} />

                    <PostDetails postId={selectedId} />

                    <Comments postId={selectedId} />
                </>
            )}

        </Container>
    );
}

export default Home;