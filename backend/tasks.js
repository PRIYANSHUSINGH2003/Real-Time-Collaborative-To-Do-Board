// In-memory task store for demo (replace with DB in production)
let tasks = [
  { id: 1, title: 'Design UI', description: 'Create wireframes', status: 'Todo', priority: 'High', assigned: 'Alice' },
  { id: 2, title: 'Setup Backend', description: 'Express + MongoDB', status: 'In Progress', priority: 'Medium', assigned: 'Bob' },
  { id: 3, title: 'Socket.IO Integration', description: 'Real-time updates', status: 'Done', priority: 'Low', assigned: 'Charlie' },
];

function getTasks() {
  return tasks;
}

function addTask(task) {
  tasks.push(task);
}

function moveTask({ id, status }) {
  tasks = tasks.map(t => t.id === id ? { ...t, status } : t);
}

function assignTask({ id, assigned }) {
  tasks = tasks.map(t => t.id === id ? { ...t, assigned } : t);
}

module.exports = { getTasks, addTask, moveTask, assignTask };
