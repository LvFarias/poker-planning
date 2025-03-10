export default class Hash {
	static generateId(): string {
		return (Math.random() + 1).toString(36).substring(7);
	}
}
