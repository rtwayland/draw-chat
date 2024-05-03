import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { UniqueCharOTP } from 'unique-string-generator';
import { v4 as uuid } from 'uuid';
import useStore from '../../store';

type Props = {
	back: () => void;
};

const Join = ({ back }: Props) => {
	const [name, setName] = useState('');
	const color = useStore((state) => state.color);
	const setColor = useStore((state) => state.setColor);
	const setRoom = useStore((state) => state.setRoom);
	const setUser = useStore((state) => state.setUser);
	const addPlayer = useStore((state) => state.addPlayer);
	const createRoom = useStore((state) => state.createRoom);

	const create = () => {
		const room = UniqueCharOTP();
		const user = { id: uuid(), name, owner: true };
		setRoom(room);
		setUser(user);
		addPlayer(user);
		const data = { room, color, user };
		createRoom(data);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<HexColorPicker color={color} onChange={setColor} />
			<input placeholder="Your Name" value={name} onChange={({ target }) => setName(target.value)} />
			<div className="flex items-center gap-4">
				<button onClick={back}>Cancel</button>
				<button onClick={create} disabled={!name}>
					Start
				</button>
			</div>
		</div>
	);
};

export default Join;
