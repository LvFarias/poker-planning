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
			{Object.keys(room?.viewers || {}).map((viewerId) => (
				<div
					key={viewerId}
					className="flex flex-col items-start justify-center gap-[0.25em]"
				>
					<div className="flex h-[4em] w-[2.5em] border-[1px] rounded-[5px] items-center justify-center sm:hidden">
						<span className="flex items-center justify-center">
							<MimoIcon name="eye-line" />
						</span>
					</div>
					<span className="whitespace-nowrap">
						{room?.viewers?.[viewerId].name}
					</span>
				</div>
			))}
		</div>
	);
}
