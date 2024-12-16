import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, ButtonGroup, Button } from "@mui/material";
import { Videos, Categories } from "./";
import usePagination from "../hooks/usePagination";  // Імпортуємо хук пагінації
import { useDebounce } from "../hooks/useDebounce";  // Імпортуємо хук для дебаунсу

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("views");

  
  const {
    videos,
    nextPageToken,
    prevPageToken,
    loading,
    loadVideos,
  } = usePagination(selectedCategory);

  
  const debouncedSortBy = useDebounce(sortBy, 500);

  
  useEffect(() => {
    loadVideos(); 
  }, [selectedCategory]);

  // Функція сортування відео
  const sortVideos = (videos, sortBy) => {
    if (!videos) return [];
    if (sortBy === "views") {
      return [...videos].sort((a, b) => b.statistics.viewCount - a.statistics.viewCount);  
    } else if (sortBy === "likes") {
      return [...videos].sort((a, b) => b.statistics.likeCount - a.statistics.likeCount);  
    }
    return videos;
  };

  // Завантажуємо відео для наступної або попередньої сторінки з троттлінгом
  const handleNextPage = () => {
    if (nextPageToken && !loading) {
      loadVideos(nextPageToken);  // Завантажуємо наступну сторінку
    }
  };

  const handlePrevPage = () => {
    if (prevPageToken && !loading) {
      loadVideos(prevPageToken);  // Завантажуємо попередню сторінку
    }
  };

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © 2024 Natem
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <ButtonGroup variant="contained" sx={{ mb: 2 }}>
          <Button onClick={() => setViewMode("grid")}>Grid View</Button>
          <Button onClick={() => setViewMode("table")}>Table View</Button>
        </ButtonGroup>

        {/* Додаємо кнопки для сортування */}
        <ButtonGroup variant="contained" sx={{ mb: 2 }}>
          <Button onClick={() => setSortBy("views")}>Sort by Views</Button>
          <Button onClick={() => setSortBy("likes")}>Sort by Likes</Button>
        </ButtonGroup>


        <Videos videos={sortVideos(videos, debouncedSortBy)} viewMode={viewMode} loading={loading} />

        
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handlePrevPage}
            disabled={!prevPageToken || loading}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextPage}
            disabled={!nextPageToken || loading}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Feed;
