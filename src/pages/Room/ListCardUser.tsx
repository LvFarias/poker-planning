import { useRooms } from '@providers/rooms.provider';
import React from 'react';
import { Colors } from 'utils/colors';
import Hash from 'utils/hash';

type ListCardUserProps = {
	users: Array<string>;
	className?: string;
	roomId: string;
	listName: string;
};
export function ListCardUser({
	users,
	className,
	roomId,
	listName,
}: ListCardUserProps) {
	const { rooms } = useRooms();

	return (
		<div
			className={`flex w-[fit-content] gap-[1em] ${className}`}
		>
			{users.map((userId, index) => (
				<React.Fragment key={`${listName}-${index}`}>
					{rooms[roomId!]?.users?.[userId] && (
						<div
							key={`${userId}-${index}`}
							className="flex flex-col items-center justify-center gap-[0.25em]"
						>
							<div
								className="flex h-[4em] w-[2.5em] border-[1px] rounded-[5px] items-center justify-center"
								style={{
									transform: rooms[roomId!].showVotes
										? 'rotateY(180deg)'
										: 'rotateY(0deg)',
									transition: 'transform 0.8s',
									transformStyle: 'preserve-3d',
								}}
							>
								<div
									className="absolute w-full h-full flex items-center justify-center bg-white"
									style={{ backfaceVisibility: 'hidden' }}
								>
									<span
										className="h-full w-full flex items-center justify-center text-white"
										style={{
											backgroundColor: `${
												rooms[roomId!]?.users?.[userId]
													.vote != ''
													? Colors.getColor(
															'special',
															'success'
													  )
													: Colors.getColor(
															'special',
															'info'
													  )
											}`,
										}}
									></span>
								</div>
								<div
									className="absolute w-full h-full flex items-center justify-center bg-white"
									style={{
										backfaceVisibility: 'hidden',
										transform: 'rotateY(180deg)',
									}}
								>
									<span
										className="h-full w-full flex items-center justify-center text-white"
										style={{
											backgroundColor: `${
												rooms[roomId!]?.users?.[userId]
													.vote != ''
													? Colors.getColor(
															'special',
															'success'
													  )
													: Colors.getColor(
															'special',
															'danger'
													  )
											}`,
										}}
									>
										{rooms[roomId!].showVotes &&
											rooms[roomId!]?.users?.[userId]
												.vote}
									</span>
								</div>
							</div>
							<span className="whitespace-nowrap">
								{rooms[roomId!]?.users?.[userId].name}
							</span>
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	);
}
