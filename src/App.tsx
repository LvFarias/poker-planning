import { RoomsProvider } from '@providers/rooms.provider';
import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import { UserProvider } from '@providers/user.provider';

const RouterComponent = lazy(() => import('./Routes/router'));

function App() {
	return (
		<BrowserRouter>
			<RoomsProvider>
				<UserProvider>
					<RouterComponent />
				</UserProvider>
			</RoomsProvider>
		</BrowserRouter>
	);
}

export default App;
