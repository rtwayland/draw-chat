/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import randomColor from 'randomcolor';
import { create } from 'zustand';
import { socket } from './socket';
import type { GameData, RoomData, User } from './typeDefs';

type Values = {
	color: string;
	room: string | null;
	user: User | null;
	players: User[];
	typingUser: User | null;
	// currentPlayer: string | null;
	// round: number;
};

type Functions = {
	setRoom: (room: string) => void;
	setColor: (color: string) => void;
	setUser: (user: User | null) => void;
	setTypingUser: (user: User | null) => void;
	createRoom: (data: RoomData) => void;
	joinRoom: (data: RoomData) => void;
	leaveRoom: (data: RoomData) => void;
	addPlayer: (player: User) => void;
	removePlayer: (player: User) => void;
	setGame: (data: GameData) => void;
	updateGame: (data: GameData) => void;
	addUserActivity: (data: { room: string; user: User | null; activity?: string }) => void;
};

type GameState = Values & Functions;

const initialState: Values = {
	user: null,
	typingUser: null,
	players: [],
	color: randomColor({ luminosity: 'bright' }),
	room: null,
	// currentPlayer: null, // Tracks the current player
	// round: 1, // Tracks the current round
};

const useStore = create<GameState>()((set) => ({
	...initialState,
	setRoom: (room) => set(() => ({ room })),
	setColor: (color) => set(() => ({ color })),
	setUser: (user) => set(() => ({ user })),
	setTypingUser: (typingUser) => set(() => ({ typingUser })),
	createRoom: (data) => {
		socket.emit('join', data);
	},
	joinRoom: (data) => {
		socket.emit('join', data);
	},
	leaveRoom: (data) => {
		socket.emit('leave', data);
		return set(() => ({ user: null }));
	},
	addPlayer: (player) => set((state) => ({ players: _.uniqBy([...state.players, player], 'id') })),
	// removePlayer: (player) => set((state) => ({ players: state.players.filter((p) => p.id !== player.id) })),
	removePlayer: (player) =>
		set((state) => {
			const filtered = state.players.filter((p) => p.id !== player.id);
			console.log('*log: filtered', filtered);
			return { players: state.players.filter((p) => p.id !== player.id) };
		}),
	setGame: (game) =>
		set((state) => {
			// const players = mergePlayers(state.players, game.players);
			const players = _.uniqBy([...state.players, ...game.players], 'id');
			const room = game.room || state.room;
			const color = game.color || state.color;
			return { room, color, players };
		}),
	updateGame: (data) => {
		socket.emit('game_update', data);
	},
	addUserActivity: (data) => {
		socket.emit('activity', data);
	},
}));

export default useStore;
