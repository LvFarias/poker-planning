import { useRooms } from '@providers/rooms.provider';
import React, { useEffect, useState } from 'react';
import { Colors } from 'utils/colors';

type ListCardUserProps = {
	position: string;
};
export function ListCardUser({ position }: ListCardUserProps) {
	const { room } = useRooms();
	const [userList, setUserList] = useState([] as Array<any>);

	useEffect(() => {
		const list = Object.values(room?.users || {});
		if (!list.length) return;
		setUserList([]);

		if (list.length > 3) {
			if (position === 'left') setUserList(list.slice(0, 1));
			if (position === 'right') setUserList(list.slice(-1));
			const topDownList = list.filter(
				(u, i) => i != 0 && i != list.length - 1
			);
			const half = Math.round(topDownList.length / 2);
			const topList = topDownList.slice(0, half);
			const downList = topDownList.slice(half);
			if (position === 'top') setUserList(topList);
			if (position === 'down') setUserList(downList);
		} else if (list.length == 3) {
			if (position === 'left') setUserList(list.slice(0, 1));
			if (position === 'top') setUserList(list.slice(1, 2));
			if (position === 'right') setUserList(list.slice(-1));
		} else if (list.length == 2) {
			if (position === 'top') setUserList(list.slice(0, 1));
			if (position === 'down') setUserList(list.slice(1));
		} else {
			if (position === 'top') setUserList(list);
		}
	}, [room?.users, position]);

	return (
		<div className="flex gap-[1em] sm:flex-col">
			{userList.map((user) => (
				<React.Fragment key={`user-${user.id}`}>
					{room?.users?.[user.id] && (
						<div
							key={`duser-${user.id}`}
							className="flex flex-col items-center justify-center gap-[0.25em] w-[100px] overflow-hidden"
						>
							<div
								className="flex h-[4em] w-[2.5em] border-[1px] rounded-[5px] items-center justify-center"
								style={{
									transform: room.showVotes
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
												room?.users?.[user.id]?.vote !=
												''
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
												room?.users?.[user.id]?.vote !=
												''
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
										{room.showVotes &&
											room?.users?.[user.id]?.vote}
									</span>
								</div>
							</div>
							<span className="w-full overflow-hidden text-ellipsis text-center whitespace-nowrap">
								{user.name}
							</span>
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	);
}
