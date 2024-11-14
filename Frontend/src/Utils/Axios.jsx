import axios from "axios";

const instance = axios.create({
  // baseURL: "https://campustrade-backend.onrender.com/api/v1/",
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzI3ZTMzNjA1NDAxNDc1NjBjYmU1YzM4ZWVlNjJiZSIsIm5iZiI6MTcyNjU2NTA3Ny4zNTk1MjksInN1YiI6IjY2ZTk0OGQyYjI5MTdlYjE4MDBhYjk5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.41AREWs6YteoOgTXA_YPmEpD3UcmsLnY5kUluJlAHd0",
  },
});

export default instance;
