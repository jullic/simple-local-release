import { AbstractAction } from '../abstract/abstract.action';
import { releaseActionHandler } from '../release/release.action';

export class FirstMajorReleaseAction extends AbstractAction {
	public async handle(params?: { config: string }): Promise<void> {
		await releaseActionHandler(params, true);
	}
}
