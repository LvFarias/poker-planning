import { RoomPage } from '@pages/Room';
import { SetupPage } from '@pages/Setup';
import { useRooms } from '@providers/rooms.provider';
import { useUser } from '@providers/user.provider';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
	const { user } = useUser();
	const { roomId, setRoomId } = useRooms();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (roomId != searchParams.get('room')!)
			setRoomId(searchParams.get('room') || '');
	}, [searchParams, roomId]);
	return (
		<>
			<div className="h-[calc(100vh-90px)]">
				{roomId && user ? (
					<RoomPage />
				) : (
					<SetupPage />
				)}
			</div>
			<footer className="p-5 w-screen text-center flex flex-col gap-2.5 h-21 shadow-[0_-5px_5px_-5px_rgba(200,200,200)] bg-[rgba(200,200,200,0.25)]">
				<h1 className="text-lg font-semibold leading-tight block">
					Esta ferramenta de Planning Poker é GRATUITA, de Código
					Aberto e Colaborativa. Nunca será PAGA ou terá ANÚNCIOS.
				</h1>
				<span className="block leading-tight text-sm">
					Contribua pelo{' '}
					<a
						className="underline cursor-pointer"
						target="_blank"
						href="https://github.com/LvFarias/poker-planning"
					>
						GitHub
					</a>{' '}
					com{' '}
					<a
						className="underline cursor-pointer"
						target="_blank"
						href="https://github.com/LvFarias/poker-planning/issues"
					>
						issues
					</a>{' '}
					ou{' '}
					<a
						className="underline cursor-pointer"
						target="_blank"
						href="https://github.com/LvFarias/poker-planning/pulls"
					>
						PRs
					</a>
					!
				</span>
			</footer>
		</>
	);
}
