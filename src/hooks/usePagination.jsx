import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";

// Кастомний хук для пагінації
const usePagination = (selectedCategory) => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadVideos = (pageToken = "") => {
    setLoading(true);  // Початок завантаження
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}&pageToken=${pageToken}`)
      .then((data) => {
        setVideos((prevVideos) => [...prevVideos, ...data.items]);  // Додаємо нові відео до списку
        setNextPageToken(data.nextPageToken);  // Оновлюємо токен наступної сторінки
        setPrevPageToken(data.prevPageToken);  // Оновлюємо токен попередньої сторінки
        setLoading(false);  // Завершення завантаження
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);  // Завершення завантаження у разі помилки
      });
  };

  // Завантаження відео при зміні категорії
  useEffect(() => {
    setVideos([]);  // Очищаємо відео при зміні категорії
    loadVideos();   // Завантажуємо нові відео для нової категорії
  }, [selectedCategory]);

  return {
    videos,
    nextPageToken,
    prevPageToken,
    loading,
    loadVideos,
  };
};

export default usePagination;
