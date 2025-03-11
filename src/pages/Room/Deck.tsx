import { useLocalStorage } from '@hooks/useLocalStorage';
import { User, useRooms } from '@providers/rooms.provider';

type DeckProps = {
	roomId: string;
};

export function Deck({ roomId }: DeckProps) {
	const cards: Array<any> = ['1', '2', '3', '5', '8', '13', '21'];

	const [localUser] = useLocalStorage<User | null>('ramdon-user', null);
	const { rooms, setUserVote } = useRooms();

	return (
		<div className="flex w-full h-[6em] p-[1em] gap-[1em] items-center justify-center">
			{cards.map((card) => (
				<div
					key={card}
					className={`
							flex h-[4em] w-[2.5em] border-[1px] rounded-[5px] items-center justify-center cursor-pointer
							${
								card ==
									rooms[roomId!]?.users?.[localUser!.id]
										.vote &&
								'bg-[black] text-[white] mb-[2em]'
							}
							${rooms[roomId!]?.showVotes && 'cursor-not-allowed'}
						`}
					onClick={() => {
						!rooms[roomId!]?.showVotes &&
							card !=
								rooms[roomId!]?.users?.[localUser!.id].vote &&
							setUserVote(roomId!, localUser!.id, card);
					}}
				>
					{card}
				</div>
			))}
		</div>
	);
}
