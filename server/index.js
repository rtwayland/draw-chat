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
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('join', (data) => {
		console.log('*log: join data', data);
		const { room, user, color } = data;
		socket.join(room);
		socket.to(room).emit('user_joined', { user, color, room });
	});

	socket.on('leave', (data) => {
		console.log('*log: leave data', data);
		const { room, user } = data;
		socket.leave(room);
		socket.to(room).emit('user_left', { user });
	});

	socket.on('game_update', (data) => {
		socket.to(data.room).emit('game_updated', data);
	});

	socket.on('activity', (data) => {
		socket.to(data.room).emit('user_activity', data);
	});

	socket.on('send_story', (data) => {
		const { room, user, storyPart } = data;
		socket.to(room).emit('received_story', { user, storyPart });
	});
});

server.listen(4000, () => {
	console.log('the server is running on port 4000');
});
