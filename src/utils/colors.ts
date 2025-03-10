import theme from '@tailwind_theme';

export class Colors {
	private static colors: Record<string, any> = theme.colors;

	static getColor(name: string, variant = 'DEFAULT'): string {
		let color = '';
		if (Colors.colors[name]) {
			if (typeof Colors.colors[name] === 'string') {
				color = Colors.colors[name];
			} else if (Colors.colors[name][variant]) {
				color = Colors.colors[name][variant];
			}
		}

		return color;
	}
}
