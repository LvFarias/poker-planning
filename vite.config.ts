import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default {
	optimizeDeps: {
		include: ['react', 'react-dom/client'],
	},
	plugins: [react(), tsconfigPaths()],
};
