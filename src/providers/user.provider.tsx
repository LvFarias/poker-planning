import { useLocalStorage } from '@hooks/useLocalStorage';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import Hash from 'utils/hash';

export type User = {
	id: string;
	name: string;
	color: string;
	vote: string;
	mode: 'user' | 'viewer';
};
type UserData = {
	user: User | null;
	setUser: (user: User) => void;
	saveUser: (name: string) => void;
};

export const UserContext = createContext({} as UserData);

export function useUser() {
	return useContext(UserContext);
}

export function UserProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useLocalStorage<User | null>('ramdon-user', null);

	useEffect(() => {
		if (user && !user.id) setUser(null);
	}, [user]);

	function saveUser(name: string) {
		if (user) {
			setUser({
				...user,
				name,
				color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
			});
		} else {
			const id = Hash.generateId();
			const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
			setUser({ id, name, color, vote: '', mode: 'user' });
		}
	}

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				saveUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
