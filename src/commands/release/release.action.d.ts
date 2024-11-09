import { AbstractAction } from '../abstract/abstract.action';
export declare class ReleaseAction extends AbstractAction {
    handle(params?: {
        config: string;
    }): Promise<void>;
}
export declare const releaseActionHandler: (params?: {
    config: string;
}, isFirstMajorRelease?: boolean) => Promise<void>;
