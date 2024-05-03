import useStore from '$store';
import copy from 'copy-to-clipboard';

const Nav = () => {
	const room = useStore((state) => state.room);
	const user = useStore((state) => state.user);
	const leaveRoom = useStore((state) => state.leaveRoom);

	return (
		<div className="flex h-6 w-full justify-between">
			{room && (
				<div className="font-bold" onClick={() => copy(room || '')}>
					{room}
				</div>
			)}
			{user && room && <button onClick={() => leaveRoom({ room, user })}>Leave</button>}
		</div>
	);
};

export default Nav;
