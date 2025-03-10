import { useRooms } from '@providers/rooms.provider';
import { useParams } from 'react-router-dom';

export function ListUser() {
	const { roomId } = useParams();
	const { rooms } = useRooms();

	return (
		<div className="flex flex-row-reverse">
			{rooms[roomId!]?.users &&
				Object.keys(rooms[roomId!]?.users).map((userId, idx) => (
					<div
						key={idx}
						className="min-w-[2em] min-h-[2em] flex items-center justify-center rounded-[50%] text-white ml-[-0.75em] border-[1px]"
						style={{
							backgroundColor: rooms[roomId!].users[userId].color,
						}}
					>
						{rooms[roomId!].users[userId].name.substring(0, 1)}
					</div>
				))}
			{rooms[roomId!]?.viewers &&
				Object.keys(rooms[roomId!]?.viewers).map((viewerId, idx) => (
					<div
						key={idx}
						className="min-w-[2em] min-h-[2em] flex items-center justify-center rounded-[50%] text-white ml-[-0.75em] border-[1px]"
						style={{
							backgroundColor: rooms[roomId!].viewers[viewerId].color,
						}}
					>
						{rooms[roomId!].viewers[viewerId].name.substring(0, 1)}
					</div>
				))}
		</div>
	);
}
