import { io } from 'socket.io-client';

const URL = 'http://localhost:5000'; // Backend server URL
export const socket = io(URL, { autoConnect: false });
