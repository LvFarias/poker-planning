import { useRooms } from '@providers/rooms.provider';
import { useUser } from '@providers/user.provider';

export function Deck() {
	const cards: Array<any> = ['1', '2', '3', '5', '8', '13', '21'];

	const { user } = useUser();
	const { room, roomId, setUserVote } = useRooms();

	return (
		<div className="flex w-full h-[6em] p-[1em] gap-[1em] items-center justify-center">
			{cards.map((card) => (
				<div
					key={card}
					className={`
							flex h-[4em] w-[2.5em] border-[1px] rounded-[5px] items-center justify-center cursor-pointer
							${card == room?.users?.[user!.id].vote && 'bg-[black] text-[white] mb-[2em]'}
							${room?.showVotes && 'cursor-not-allowed'}
						`}
					onClick={() => {
						!room?.showVotes &&
							card != room?.users?.[user!.id].vote &&
							setUserVote(roomId!, user!.id, card);
					}}
				>
					{card}
				</div>
			))}
		</div>
	);
}
