const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173',
	},
});

io.on('connection', (socket) => {
	socket.on('join_room', (data) => {
		const { room, user } = data;
		socket.join(room);
		socket.to(room).emit('user_joined', { user });
	});

	socket.on('send_story', (data) => {
		const { room, user, storyPart } = data;
		socket.to(room).emit('received_story', { user, storyPart });
	});
});

server.listen(4000, () => {
	console.log('the server is running on port 4000');
});
