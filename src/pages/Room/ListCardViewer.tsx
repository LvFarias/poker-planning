import { MimoIcon, MimoToggle } from '@mimo-live-sales/mimo-ui';
import { useRooms } from '@providers/rooms.provider';
import { useUser } from '@providers/user.provider';

export function ListCardViewer() {
	const { user, setUser } = useUser();
	const { room, roomId, changeUserMode } = useRooms();

	function changeMode() {
		changeUserMode(roomId, user!.id);
		const mode = !room?.viewers?.[user!.id] ? 'viewer' : 'user';
		setUser({ ...user!, mode });
	}

	return (
		<div className="flex flex-col items-start w-[fit-content] gap-[1em]">
			<div className="flex items-center gap-[1em]">
				<MimoToggle
					onChange={() => changeMode()}
					toggle={!!room?.viewers?.[user!.id]}
				/>
				<label>Modo Espectador</label>
			</div>
			<div className='flex flex-wrap gap-[1em]'>
				{Object.keys(room?.viewers || {}).map((viewerId) => (
					<div
						key={viewerId}
						className="flex flex-col items-start justify-center gap-[0.25em]"
					>
						<span className="whitespace-nowrap">
							{room?.viewers?.[viewerId].name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
