/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { socket } from './socket';

import Game from '$components/Game';
import Welcome from '$components/Welcome';
import useStore from '$store';
import { RoomData } from '$types';

const App = () => {
	const room = useStore((state) => state.room);
	const color = useStore((state) => state.color);
	const user = useStore((state) => state.user);
	const typingUser = useStore((state) => state.typingUser);
	const players = useStore((state) => state.players);
	const addPlayer = useStore((state) => state.addPlayer);
	const removePlayer = useStore((state) => state.removePlayer);
	const setColor = useStore((state) => state.setColor);
	const setRoom = useStore((state) => state.setRoom);
	const setTypingUser = useStore((state) => state.setTypingUser);
	const setGame = useStore((state) => state.setGame);
	const updateGame = useStore((state) => state.updateGame);

	useEffect(() => {
		// no-op if the socket is already connected
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		updateGame({ players, room, color });
	}, [players, color, room]);

	useEffect(() => {
		socket.on('user_joined', (data) => {
			console.log('*log: data', data);
			const { user } = data as RoomData;
			if (!players.find((player) => player.id === user.id)) addPlayer(user);
		});

		socket.on('user_left', (data) => {
			console.log('*log: leave data', data);
			const { user: userLeft } = data as RoomData;
			removePlayer(userLeft);
		});

		socket.on('game_updated', (data) => {
			setGame(data);
		});

		socket.on('user_activity', (data) => {
			const { user: activeUser } = data as RoomData;
			if (activeUser.id === typingUser?.id) return setTypingUser(null);
			else if (activeUser.id !== user?.id) {
				setTypingUser(activeUser);
			}
			// if (!activeUser) return setTypingUser(null);
			// else if (activeUser.id !== user?.id) {
			// 	setTypingUser(activeUser);
			// }
		});
	}, [user, typingUser]);

	return (
		<div className="h-screen w-screen" style={{ backgroundColor: color }}>
			{typingUser && <div>{typingUser.name} is typing...</div>}
			{user ? <Game /> : <Welcome />}
		</div>
	);
};

export default App;
