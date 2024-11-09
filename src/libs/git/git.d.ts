export declare const gitAdd: (files?: string) => Promise<{
    data: {
        chunk: string;
        type: "err" | "out";
    }[];
} | null>;
export declare const gitCommit: (message: string) => Promise<{
    data: {
        chunk: string;
        type: "err" | "out";
    }[];
} | null>;
export declare const gitAddTag: (tag: string) => Promise<{
    data: {
        chunk: string;
        type: "err" | "out";
    }[];
} | null>;
