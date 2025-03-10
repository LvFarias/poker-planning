import { NotFoundPage } from '@pages/404';
import { HomePage } from '@pages/Home';
import { RoomPage } from '@pages/Room';
import { Route, Routes } from 'react-router-dom';
import { MimoRoutes } from './router.enum';
import { RoomsProvider } from '@providers/rooms.provider';

export default function Router() {
	return (
		<Routes>
			<Route path={MimoRoutes.HOME} element={<RoomsProvider><HomePage /></RoomsProvider>} />
			<Route path={MimoRoutes.ROOM} element={<RoomsProvider><RoomPage /></RoomsProvider>} />
			<Route path={MimoRoutes.NOT_FOUND} element={<NotFoundPage />} />
		</Routes>
	);
}
