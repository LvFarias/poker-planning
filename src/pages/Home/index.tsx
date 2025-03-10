import { useLocalStorage } from '@hooks/useLocalStorage';
import {
	MimoButton,
	MimoInput,
	MimoToastError,
} from '@mimo-live-sales/mimo-ui';
import { User, useRooms } from '@providers/rooms.provider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hash from 'utils/hash';

export function HomePage() {
	const [roomName, setRoomName] = useState('');
	const [roomId, setRoomId] = useState('');
	const { rooms, createRoom } = useRooms();

	const navigate = useNavigate();
	const [user, setUser] = useLocalStorage<User | null>('ramdon-user', null);

	function setUserName(name: string) {
		if (user) {
			const id = user.id.length > 7 ? Hash.generateId() : user.id;
			setUser({
				...user,
				id,
				name,
				color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
			});
		} else {
			const id = Hash.generateId();
			const color = `#${Math.floor(Math.random() * 16777215).toString(
				16
			)}`;
			setUser({ id, name, color, vote: '', mode: 'user' });
		}
	}
	function createNewRoom() {
		const id = createRoom(roomName, user!.id);
		navigate(`/${id}`);
	}

	function joinRoom() {
		if (Object.keys(rooms).includes(roomId)) {
			navigate(`/${roomId}`);
		} else {
			MimoToastError.show(`A sala "${roomId}" não existe!`);
		}
	}

	return (
		<div className="w-[100vw] h-[100vh] flex items-center justify-center">
			<div className="w-[50vw] flex flex-col items-center gap-[2em] p-[2em] rounded-[10px] shadow-[0_0_20px_0_#00000080]">
				<MimoInput
					className="w-[50%]"
					placeholder="Digite seu Nome"
					value={user?.name}
					onChange={(v) => setUserName(v)}
				/>
				<div className="w-full flex items-center justify-evenly gap-[2em] p-[1em]">
					<div className="w-full flex flex-col align-start gap-[0.5em]">
						<MimoInput
							className="w-full"
							label="Crie uma nova Sala:"
							placeholder="Nome da Sala"
							value={roomName}
							onChange={(v) => setRoomName(v)}
						/>
						<MimoButton
							className="mx-0 my-auto"
							label="Criar"
							onClick={() => createNewRoom()}
						/>
					</div>
					<div className="w-full flex flex-col align-start gap-[0.5em]">
						<MimoInput
							className="w-full"
							label="Entrar em uma sala:"
							placeholder="Código da Sala"
							value={roomId}
							onChange={(v) => setRoomId(v)}
						/>
						<MimoButton
							className="mx-0 my-auto"
							label="Entrar"
							onClick={() => joinRoom()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
