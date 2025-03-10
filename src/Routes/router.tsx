import { NotFoundPage } from '@pages/404';
import { HomePage } from '@pages/Home';
import { RoomPage } from '@pages/Room';
import { Route, Routes } from 'react-router-dom';
import { MyRoutes } from './router.enum';
import { RoomsProvider } from '@providers/rooms.provider';

export default function Router() {
	return (
		<Routes>
			<Route path={MyRoutes.HOME} element={<RoomsProvider><HomePage /></RoomsProvider>} />
			<Route path={MyRoutes.ROOM} element={<RoomsProvider><RoomPage /></RoomsProvider>} />
			<Route path={MyRoutes.NOT_FOUND} element={<NotFoundPage />} />
		</Routes>
	);
}
