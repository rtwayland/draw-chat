import useStore from '$store';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

type Props = {
	back: () => void;
};

const Join = ({ back }: Props) => {
	const setUser = useStore((state) => state.setUser);
	const joinRoom = useStore((state) => state.joinRoom);
	const [name, setName] = useState('');
	const [code, setCode] = useState('');

	const join = () => {
		const user = { id: uuid(), name, owner: false };
		setUser(user);
		const data = { room: code, user };
		joinRoom(data);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<input placeholder="Group Code" value={code} onChange={({ target }) => setCode(target.value)} />
			<input placeholder="Your Name" value={name} onChange={({ target }) => setName(target.value)} />
			<div className="flex items-center gap-4">
				<button onClick={back}>Cancel</button>
				<button onClick={join} disabled={!name || !code}>
					Join
				</button>
			</div>
		</div>
	);
};

export default Join;
