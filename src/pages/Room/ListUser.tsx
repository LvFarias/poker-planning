import { useRooms } from '@providers/rooms.provider';

export function ListUser() {
	const { room } = useRooms();

	return (
		<div className="flex flex-row-reverse">
			{Object.keys(room?.users || {}).map((userId) => (
				<div
					key={userId}
					className="min-w-[2em] min-h-[2em] flex items-center justify-center rounded-[50%] text-white ml-[-0.75em] border-[1px]"
					style={{
						backgroundColor: room?.users?.[userId]?.color,
					}}
				>
					{room?.users?.[userId]?.name?.substring(0, 1)}
				</div>
			))}
			{Object.keys(room?.viewers || {}).map((viewerId) => (
				<div
					key={viewerId}
					className="min-w-[2em] min-h-[2em] flex items-center justify-center rounded-[50%] text-white ml-[-0.75em] border-[1px]"
					style={{
						backgroundColor: room?.viewers?.[viewerId]?.color,
					}}
				>
					{room?.viewers?.[viewerId]?.name.substring(0, 1)}
				</div>
			))}
		</div>
	);
}
