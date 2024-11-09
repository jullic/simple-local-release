import { AbstractAction } from '../abstract/abstract.action';
export declare class GetNextVersionAction extends AbstractAction {
    handle(params?: {
        config: string;
    }): Promise<void>;
}
export declare const getNextVersionActionHandler: (params?: {
    config: string;
}) => Promise<void>;
