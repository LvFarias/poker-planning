export default class Hash {
	static generateId(): string {
		return Math.random().toString(36).substring(2, 12);
	}
}
