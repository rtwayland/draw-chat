export type User = {
	id: string;
	name: string;
	owner: boolean;
};

export type RoomData = {
	user: User;
	room: string;
	color?: string;
};

export type GameData = {
	players: User[];
	room: string | null;
	color: string;
};
