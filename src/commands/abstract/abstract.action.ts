export abstract class AbstractAction {
	public abstract handle(...args: unknown[]): Promise<void>;
}
