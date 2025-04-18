import { NotFoundPage } from '@pages/404';
import { HomePage } from '@pages/Home';
import { RoomPage } from '@pages/Room';
import { Route, Routes } from 'react-router-dom';
import { MyRoutes } from './router.enum';
import { RoomsProvider } from '@providers/rooms.provider';

export default function Router() {
	return (
		<Routes>
			<Route
				path={MyRoutes.HOME}
				element={
					<HomePage />
				}
			/>
		</Routes>
	);
}
