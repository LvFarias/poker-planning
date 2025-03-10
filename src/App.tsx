import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';

const RouterComponent = lazy(() => import('./Routes/router'));

function App() {
	return (
		<BrowserRouter>
			<RouterComponent />
		</BrowserRouter>
	);
}

export default App;
