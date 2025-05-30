import {
	MimoButton,
	MimoInput,
	MimoToastError,
} from '@mimo-live-sales/mimo-ui';
import { useRooms } from '@providers/rooms.provider';
import { useUser } from '@providers/user.provider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SetupPage() {
	const { user, saveUser } = useUser();
	const { roomId, rooms, createRoom } = useRooms();

	const [roomName, setRoomName] = useState('');
	const [userName, setUserName] = useState(user?.name || '');
	const [_roomId, setRoomId] = useState('');

	useEffect(() => {
		if (roomId != _roomId) setRoomId(roomId);
	}, [roomId]);

	useEffect(() => {
		if (user && user.name != userName) setUserName(user.name);
	}, [user]);

	const navigate = useNavigate();

	function createNewRoom() {
		if (!userName) {
			MimoToastError.show('Coloca um nome pra equipe saber quem é você!');
			return;
		}
		saveUser(userName);
		const id = createRoom(roomName);
		navigate(`/?room=${id}`);
	}

	function joinRoom() {
		if (!userName) {
			MimoToastError.show('Coloca um nome pra equipe saber quem é você!');
			return;
		}
		if (!Object.keys(rooms).includes(_roomId)) {
			MimoToastError.show(
				`Não encontrei nenhuma sala com código "${_roomId}"!`
			);
			return;
		}
		saveUser(userName);
		navigate(`/?room=${_roomId}`);
	}

	return (
		<div className="w-[100dvw] h-[100%] flex items-center justify-center">
			<div className="w-[50dvw] flex flex-col items-center gap-[2em] p-[2em] rounded-[10px] shadow-[0_0_20px_0_theme(colors.black.400)] sm:w-[90dvw] sm:p[1em]">
				<MimoInput
					className="w-[50%] sm:w-full sm:w-full"
					placeholder="Digite seu Nome"
					value={userName}
					onChange={(v) => setUserName(v)}
				/>
				<div className="w-full flex items-center justify-evenly gap-[2em] p-[1em] sm:p-[0] sm:flex-col">
					{!roomId && (
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
								disabled={!roomName}
								onClick={() => createNewRoom()}
							/>
						</div>
					)}
					{roomId && (
						<div className="w-full flex flex-col align-start gap-[0.5em]">
							<MimoInput
								className="w-full"
								label="Entrar em uma sala:"
								placeholder="Código da Sala"
								value={_roomId}
								onChange={(v) => setRoomId(v)}
							/>
							<MimoButton
								className="mx-0 my-auto"
								label="Entrar"
								disabled={!_roomId}
								onClick={() => joinRoom()}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
