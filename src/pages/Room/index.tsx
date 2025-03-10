import { useLocalStorage } from '@hooks/useLocalStorage';
import { MimoButton } from '@mimo-live-sales/mimo-ui';
import { Room, User, useRooms } from '@providers/rooms.provider';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Deck } from './Deck';
import { ListCardUser } from './ListCardUser';
import { ListUser } from './ListUser';
import { ListCardViewer } from './ListCardViewer';

let room: Room;

export function RoomPage() {
	const [totalUsers, setTotalUsers] = useState([] as Array<string>);
	const [leftUsers, setLeftUsers] = useState([] as Array<string>);
	const [topUsers, setTopUsers] = useState([] as Array<string>);
	const [rightUsers, setRightUsers] = useState([] as Array<string>);
	const [downUsers, setDownUsers] = useState([] as Array<string>);

	const { roomId } = useParams();
	const { rooms, joinRoom, showVotes, clearVotes } = useRooms();
	const [localUser] = useLocalStorage<User | null>('mimo-user', null);

	useEffect(() => {
		if (room != null) return;
		if (localUser !== null) {
			room = joinRoom(roomId!, localUser);
		}
	}, [room, localUser]);

	useEffect(() => {
		const ids = Object.keys(rooms[roomId!].users || {});
		if (totalUsers.length == ids.length) return;
		setTotalUsers(ids);
		if (ids.length == 1) {
			setLeftUsers([]);
			setRightUsers([]);
			setDownUsers([]);
			setTopUsers(ids);
		} else if (ids.length == 2) {
			setLeftUsers([]);
			setRightUsers([]);
			setTopUsers(ids.slice(0, ids.length / 2));
			setDownUsers(ids.slice(ids.length / 2));
		} else {
			setLeftUsers(ids.slice(0, 1));
			setTopUsers(ids.slice(1, Math.round((ids.length - 1) / 2)));
			setDownUsers(
				ids.slice(Math.round((ids.length - 1) / 2), ids.length - 1)
			);
			setRightUsers(ids.slice(ids.length - 1));
		}
	}, [rooms[roomId!]?.users]);

	function getVotesAvg() {
		let votes = 0;
		let sum = 0;
		Object.keys(rooms[roomId!].users || {}).map((userId) => {
			if (Number(rooms[roomId!].users[userId].vote) > 0) {
				votes++;
				sum += Number(rooms[roomId!].users[userId].vote);
			}
		})
		return sum > 0 ? sum / votes : 0;
	}

	return (
		<>
			{!!room && (
				<>
					<div className="flex w-full h-[4em] items-center justify-between py-[1em] px-[2em] shadow-[0_0_20px_0_#00000080]">
						<div className="name">{rooms[roomId!]?.name} - {roomId!}</div>
						<ListUser />
					</div>
					<div className="flex w-[fit-content] h-[calc(100vh-10em)] items-center justify-center flex-col my-[0] mx-auto gap-[1em]">
						<div className="absolute top-[6em] left-[2em]">
							<ListCardViewer />
						</div>
						<ListCardUser users={topUsers}></ListCardUser>
						<div className="flex items-center w-full gap-[1em]">
							<ListCardUser users={leftUsers}></ListCardUser>
							<div className="w-full h-[8em] min-w-[18em] inline-flex flex-col gap-[1em] items-center justify-center rounded-[10px] shadow-[0_0_20px_0_#00000080]">
								<MimoButton
									label={
										rooms[roomId!].showVotes
											? 'Limpar'
											: 'Mostrar'
									}
									onClick={() =>
										rooms[roomId!].showVotes
											? clearVotes(roomId!)
											: showVotes(roomId!)
									}
								/>
								<span className='h-[2em] flex items-center justify-center'>{rooms[roomId!].showVotes && `Média: ${getVotesAvg()}`}</span>
							</div>
							<ListCardUser users={rightUsers}></ListCardUser>
						</div>
						<ListCardUser users={downUsers}></ListCardUser>
					</div>
					{rooms[roomId!]?.users?.[localUser!.id] && <Deck />}
				</>
			)}
		</>
	);
}
