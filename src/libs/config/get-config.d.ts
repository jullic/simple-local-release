import z from 'zod';
export declare const configSchema: z.ZodObject<{
    versionTagPrefix: z.ZodOptional<z.ZodString>;
    breakingChangeTitle: z.ZodOptional<z.ZodString>;
    featureTitle: z.ZodOptional<z.ZodString>;
    fixTitle: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    versionTagPrefix: z.ZodOptional<z.ZodString>;
    breakingChangeTitle: z.ZodOptional<z.ZodString>;
    featureTitle: z.ZodOptional<z.ZodString>;
    fixTitle: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    versionTagPrefix: z.ZodOptional<z.ZodString>;
    breakingChangeTitle: z.ZodOptional<z.ZodString>;
    featureTitle: z.ZodOptional<z.ZodString>;
    fixTitle: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type ConfigSchema = z.infer<typeof configSchema>;
export declare const BASE_CONFIG: ConfigSchema;
export declare const getConfig: (configName?: string) => Promise<{
    [x: string]: unknown;
    versionTagPrefix?: string | undefined;
    breakingChangeTitle?: string | undefined;
    featureTitle?: string | undefined;
    fixTitle?: string | undefined;
    title?: string | undefined;
}>;
