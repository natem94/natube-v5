import React from "react";
import { Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";  // Імпортуємо Link для навігації

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, viewMode, direction }) => {
  if (!videos?.length) return <Loader />;

  // Таблиця відображення
  if (viewMode === "table") {
    return (
      <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Channel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Link
                    to={`/video/${item.id.videoId}`}  // Перехід на сторінку відео
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={item.snippet?.thumbnails?.medium?.url}
                      alt={item.snippet?.title}
                      style={{ width: "120px", borderRadius: "5px" }}
                    />
                  </Link>
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  <Link
                    to={`/video/${item.id.videoId}`}  // Перехід на сторінку відео
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {item.snippet?.title}
                  </Link>
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  <Link
                    to={`/channel/${item.snippet?.channelId}`}  
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {item.snippet?.channelTitle}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
