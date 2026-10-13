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

import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../lang/LanguageSwitcher";

function Home() {

    const [editId, setEditId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const { t, i18n } = useTranslation();


    const handleSuccess = () => {
        setEditId(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>

            <LanguageSwitcher />

            <h1>{t("welcome")}</h1>

            <h2>{t("home")}</h2>

            <button>{t("login")}</button>

            <button>{t("logout")}</button>

            <Typography>{t("hello", { name: "Nuriyya" })}</Typography>

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