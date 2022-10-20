import { SafeParseReturnType, z, ZodType } from "zod";

export interface ICoreParser<
    TModelParserInputData extends z.infer<ZodType<unknown, unknown, unknown>>,
    TModelParserOutputData extends z.infer<ZodType<unknown, unknown, unknown>>
> {
    parseTo(inputData: TModelParserInputData): TModelParserOutputData | never;
}

export type TParser<I, O> = (input: I) => SafeParseReturnType<I, O>;
