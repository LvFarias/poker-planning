import { useLocalStorage } from '@hooks/useLocalStorage';
import { MimoIcon, MimoToggle } from '@mimo-live-sales/mimo-ui';
import { User, useRooms } from '@providers/rooms.provider';
type ListCardViewerProps = {
	roomId: string;
};
export function ListCardViewer({ roomId }: ListCardViewerProps) {
	const { rooms, changeUserMode } = useRooms();
	const [localUser, setLocalUser] = useLocalStorage<User | null>(
		'ramdon-user',
		null
	);

	function changeMode() {
		changeUserMode(roomId!, localUser!.id);
		const mode = !rooms[roomId!]?.viewers?.[localUser!.id]
			? 'viewer'
			: 'user';
		setLocalUser({ ...localUser!, mode });
	}

	return (
		<div className="flex flex-col items-start w-[fit-content] gap-[1em]">
			<div className="flex items-center gap-[1em]">
				<MimoToggle
					onChange={() => changeMode()}
					toggle={!!rooms[roomId!]?.viewers?.[localUser!.id]}
				/>
				<label>Modo Espectador</label>
			</div>
			{Object.keys(rooms[roomId!]?.viewers || {}).map((viewerId) => (
				<div
					key={viewerId}
					className="flex flex-col items-center justify-center gap-[0.25em]"
				>
					<div className="flex h-[4em] w-[2.5em] border-[1px] rounded-[5px] items-center justify-center">
						<span className="flex items-center justify-center">
							<MimoIcon name="eye-line" />
						</span>
					</div>
					<span className="whitespace-nowrap">
						{rooms[roomId!]?.viewers?.[viewerId].name}
					</span>
				</div>
			))}
		</div>
	);
}
