require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-collab', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('API Running');
});

// Real-time task logic
const { getTasks, addTask, moveTask, assignTask } = require('./tasks');

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Send current tasks on connect
  socket.emit('tasks:update', getTasks());

  socket.on('task:add', (task) => {
    addTask(task);
    io.emit('tasks:update', getTasks());
  });

  socket.on('task:move', ({ id, status }) => {
    moveTask({ id, status });
    io.emit('tasks:update', getTasks());
  });

  socket.on('task:assign', ({ id, assigned }) => {
    assignTask({ id, assigned });
    io.emit('tasks:update', getTasks());
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
