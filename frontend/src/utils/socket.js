import { io } from 'socket.io-client';

const URL = 'http://localhost:5000' || 'https://real-time-collaborative-to-do-board-npp5.onrender.com'; // Backend server URL
export const socket = io(URL, { autoConnect: false });
