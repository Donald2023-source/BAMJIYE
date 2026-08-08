import { io } from "socket.io-client";

export const socket = io("http://localhost:8080", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmE5M2ZiN2Q2MjdjMzdhMjUwNjYyZSIsImVtYWlsIjoidGhlZGlzdGluY3Rzb3VuZEBnbWFpbC5jb20iLCJyb2xlIjoiZHJpdmVyIiwiaWF0IjoxNzgxMTc1MjkxLCJleHAiOjE3ODE3ODAwOTF9.0ythwHMSjrjjN6a_VkLE-ofPDX4o0YWlRU-yE0C5Bqg",
  },
  transports: ["websocket"],
});
