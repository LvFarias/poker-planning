import { MimoButton } from '@mimo-live-sales/mimo-ui';
import { useRooms } from '@providers/rooms.provider';
import { useUser } from '@providers/user.provider';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import { Deck } from './Deck';
import { ListCardUser } from './ListCardUser';
import { ListCardViewer } from './ListCardViewer';
import { ListUser } from './ListUser';
import { Colors } from 'utils/colors';

export function RoomPage() {
	const { user } = useUser();
	const { room, roomId, joinRoom, showVotes, clearVotes } = useRooms();

	useEffect(() => {
		if (room != null && room.users && room.users[user!.id]) return;
		joinRoom(roomId, user!);
	}, [room, roomId, user, joinRoom]);

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
					<div className="flex w-full h-[4em] items-center justify-between py-[1em] px-[2em] shadow-[0_0_20px_0_theme(colors.black.400)]">
						<div className="name">
							<b>{room?.name}:</b> {roomId}
						</div>
						<ListUser />
					</div>
					<div className="flex flex-col min-h-[calc(100%-10em)] h-auto items-center justify-start my-[0] mx-auto gap-[1em] overflow-hidden">
						<div className="h-full w-full p-[1em]">
							<ListCardViewer />
						</div>
						<div className="flex items-center h-auto w-auto gap-[1em] sm:flex-col">
							<ListCardUser position="left" />
							<div className="flex flex-col items-center w-full gap-[1em] sm:flex-row">
								<ListCardUser position="top" />
								<div className="w-full h-auto self-stretch min-w-[18em] p-[1em] flex flex-col gap-[1em] items-center justify-center rounded-[10px] shadow-[0_0_20px_0_theme(colors.black.400)] sm:min-w-[calc(100dvw-200px-2em)]">
									{room?.viewers?.[user!.id] && (
										<MimoButton
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
										/>
									)}
									<span className="h-[2em] flex items-center justify-center">
										{room?.showVotes &&
											`Média: ${getVotesAvg()}`}
									</span>
								</div>
								<ListCardUser position="down" />
							</div>
							<ListCardUser position="right" />
						</div>
						<div className='flex w-full justify-end px-[1em] py-[2em] sm:hidden'>
							<QRCodeSVG value={window.location.href} size={160} bgColor={Colors.getColor('white')} fgColor={Colors.getColor('black')} />
						</div>
					</div>
					{room?.users?.[user!.id] && <Deck />}
				</>
			)}
		</>
	);
}
