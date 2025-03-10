import { useFirebaseApp, useObject } from '@hooks/useFirebaseApp';
import { initializeApp } from 'firebase/app';
import {
	getDatabase,
	onDisconnect,
	ref,
	remove,
	set,
	update
} from 'firebase/database';
import { PropsWithChildren, createContext, useContext } from 'react';
import Hash from 'utils/hash';

const firebaseConfig = {
	appId: import.meta.env.VITE_FIREBASE_APPID.trim(),
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY.trim(),
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID.trim(),
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN.trim(),
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL.trim(),
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET.trim(),
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID.trim(),
};

initializeApp(firebaseConfig);

export type User = {
	id: string;
	name: string;
	color: string;
	vote: string;
	mode: 'user' | 'viewer';
};
export type Room = {
	id: string;
	name: string;
	showVotes: boolean;
	users: Record<string, User>;
	viewers: Record<string, User>;
};
type RoomsData = {
	rooms: Record<string, Room>;
	createRoom: (name: string, userId: string) => string;
	joinRoom: (roomId: string, user: User) => Room;
	changeUserMode: (roomId: string, userId: string) => void;
	setUserVote: (roomId: string, userId: string, vote: string) => void;
	showVotes: (roomId: string) => void;
	clearVotes: (roomId: string) => void;
};

export const RoomsContext = createContext({} as RoomsData);

export function useRooms() {
	return useContext(RoomsContext);
}

export function RoomsProvider({ children }: PropsWithChildren) {
	const roomsApp = useFirebaseApp('rooms', {
		databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL.trim(),
	});
	const [rooms] = useObject(ref(getDatabase(roomsApp)));

	function createRoom(name: string, userId: string) {
		const id = Hash.generateId();
		const code = id.substring(0, 7);
		const roomDB = {
			id,
			name,
			showVotes: false,
			users: [userId],
		};
		set(rooms!.child(code).ref, roomDB);
		return code;
	}

	function joinRoom(roomId: string, user: User) {
		if (rooms?.val()[roomId].users && rooms?.val()[roomId].users[user.id]) {
			console.log('atualiza user');
			update(rooms!.child(`${roomId}/users/${user.id}`).ref, {
				name: user.name,
				color: user.color,
			});
		} else if (
			rooms?.val()[roomId].viewers &&
			rooms?.val()[roomId].viewers[user.id]
		) {
			console.log('atualiza viewers');
			update(rooms!.child(`${roomId}/viewers/${user.id}`).ref, {
				name: user.name,
				color: user.color,
			});
		} else {
			console.log('add', user.mode);
			set(rooms!.child(`${roomId}/${user.mode}s/${user.id}`).ref, user);
		}
		onDisconnect(rooms!.child(`${roomId}/users/${user.id}`).ref).remove();
		onDisconnect(rooms!.child(`${roomId}/viewers/${user.id}`).ref).remove();
		return rooms?.val()?.[roomId];
	}

	function changeUserMode(roomId: string, userId: string) {
		if (rooms?.val()[roomId].users && rooms?.val()[roomId].users[userId]) {
			set(rooms!.child(`${roomId}/viewers/${userId}`).ref, {
				...rooms?.val()[roomId].users[userId],
			});
			remove(rooms!.child(`${roomId}/users/${userId}`).ref);
		} else {
			set(rooms!.child(`${roomId}/users/${userId}`).ref, {
				...rooms?.val()[roomId].viewers[userId],
			});
			remove(rooms!.child(`${roomId}/viewers/${userId}`).ref);
		}
	}

	function setUserVote(roomId: string, userId: string, vote: string) {
		update(rooms!.child(`${roomId}/users/${userId}`).ref, { vote });
	}

	function showVotes(roomId: string) {
		set(rooms!.child(`${roomId}/showVotes`).ref, true);
	}

	function clearVotes(roomId: string) {
		set(rooms!.child(`${roomId}/showVotes`).ref, false);
		Object.keys(rooms?.val()[roomId].users).map((userId) => {
			setUserVote(roomId, userId, '');
		});
	}

	return (
		<RoomsContext.Provider
			value={{
				rooms: rooms?.val(),
				createRoom,
				joinRoom,
				setUserVote,
				showVotes,
				clearVotes,
				changeUserMode,
			}}
		>
			{rooms?.val() && children}
		</RoomsContext.Provider>
	);
}
