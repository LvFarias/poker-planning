import { MimoButton } from '@mimo-live-sales/mimo-ui';
import { useRooms } from '@providers/rooms.provider';
import { useUser } from '@providers/user.provider';
import { useEffect } from 'react';
import { Deck } from './Deck';
import { ListCardUser } from './ListCardUser';
import { ListCardViewer } from './ListCardViewer';
import { ListUser } from './ListUser';

export function RoomPage() {
	const { user } = useUser();
	const { room, roomId, rooms, joinRoom, showVotes, clearVotes } = useRooms();

	useEffect(() => {
		if (room != null && room.users && room.users[user!.id]) return;
		joinRoom(roomId, user!);
	}, [room, roomId, user]);

	function getVotesAvg() {
		let sum = 0;
		let votes = 0;
		Object.keys(room?.users || {}).map((userId) => {
			if (Number(room?.users[userId].vote) > 0) {
				votes++;
				sum += Number(room?.users[userId].vote);
			}
		});
		return Math.round(sum > 0 ? sum / votes : 0);
	}

	return (
		<>
			{!!room && (
				<>
					<div className="flex w-full h-[4em] items-center justify-between py-[1em] px-[2em] shadow-[0_0_20px_0_#00000080]">
						<div className="name">
							<b>{room?.name}:</b> {roomId}
						</div>
						<ListUser />
					</div>
					<div className="flex w-[fit-content] h-[calc(100vh-10em-90px)] items-center justify-center my-[0] mx-auto gap-[1em]">
						<div className="absolute top-[6em] left-[2em]">
							<ListCardViewer />
						</div>
						<ListCardUser position="left" />
						<div className="flex flex-col items-center w-full gap-[1em]">
							<ListCardUser position="top" />
							<div className="w-full h-[8em] min-w-[18em] inline-flex flex-col gap-[1em] items-center justify-center rounded-[10px] shadow-[0_0_20px_0_#00000080]">
								{room?.viewers?.[user!.id] && (<MimoButton
									label={
										room?.showVotes
											? 'Limpar'
											: 'Mostrar'
									}
									onClick={() =>
										room?.showVotes
											? clearVotes(roomId!)
											: showVotes(roomId!)
									}
								/>)}
								<span className="h-[2em] flex items-center justify-center">
									{room?.showVotes &&
										`Média: ${getVotesAvg()}`}
								</span>
							</div>
							<ListCardUser position="down" />
						</div>
						<ListCardUser position="right" />
					</div>
					{room?.users?.[user!.id] && <Deck />}
				</>
			)}
		</>
	);
}
