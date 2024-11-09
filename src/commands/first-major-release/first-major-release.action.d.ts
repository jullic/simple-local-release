import { AbstractAction } from '../abstract/abstract.action';
export declare class FirstMajorReleaseAction extends AbstractAction {
    handle(params?: {
        config: string;
    }): Promise<void>;
}
