import Nav from '$components/Nav';
import useStore from '$store';
import _ from 'lodash';
import { ChangeEvent, useState } from 'react';

const debounceActivity = _.debounce((cb) => cb(), 500, { leading: true });

const Game = () => {
	const room = useStore((state) => state.room);
	const user = useStore((state) => state.user);
	const players = useStore((state) => state.players);
	const addUserActivity = useStore((state) => state.addUserActivity);
	const [value, setValue] = useState('');

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { target } = event;
		setValue(target?.value);
		if (room && user&& target?.value) {
			// addUserActivity({ room, user, activity: 'typing' });
			debounceActivity(() => {
				addUserActivity({ room, user, activity: 'typing' });
			});
		}
	};

	return (
		<div>
			<Nav />
			<div>Welcome {user?.name}</div>
			<div>
				Players:{' '}
				<pre>
					{players.map((player) => (
						<div key={player.id}>{player.name}</div>
					))}
				</pre>
				<input placeholder="Message" value={value} onChange={handleInput} />
			</div>
		</div>
	);
};

export default Game;
