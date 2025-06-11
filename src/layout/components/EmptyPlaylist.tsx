import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useNavigate } from "react-router-dom";

const EmptyPlaylist: React.FC = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/"); // 혹은 '플레이리스트 생성' 페이지가 있다면 그쪽으로 이동
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                py: 8,
                px: 2,
                bgcolor: "#fafafa",
                borderRadius: 2,
                border: "1px dashed #ddd",
            }}
        >
            <LibraryMusicIcon sx={{ fontSize: 64, color: "#bdbdbd", mb: 2 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
                아직 플레이리스트가 없습니다
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                새로운 플레이리스트를 만들어보세요!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", px: 3, borderRadius: 2 }}
                onClick={handleCreate}
            >
                홈으로 가기
            </Button>
        </Box>
    );
};

export default EmptyPlaylist;