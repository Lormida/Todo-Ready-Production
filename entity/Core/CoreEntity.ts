import { z, ZodType } from "zod";

export interface ICoreEntity<
    M extends ZodType<unknown, unknown, unknown>,
    I extends z.infer<M>
> {
    modelDataSchema: M;
    data: I;
    validate(data: I): z.SafeParseReturnType<unknown, unknown>;
}

export class CoreEntity<
    TModelDataSchema extends ZodType<unknown, unknown, unknown>,
    TModelData extends z.infer<TModelDataSchema>
> implements ICoreEntity<TModelDataSchema, TModelData>
{
    _data: TModelData;
    modelDataSchema: TModelDataSchema;
    validate(data: TModelData) {
        return this.modelDataSchema.safeParse(data);
    }

    constructor({
        data,
        modelDataSchema,
    }: {
        data: TModelData;
        modelDataSchema?: TModelDataSchema;
    }) {
        this.modelDataSchema = modelDataSchema;

        const validateResult = this.validate(data);
        if (validateResult.success === true) {
            this._data = data;
        } else {
            throw validateResult.error;
        }
    }

    get data() {
        return this._data;
    }
}
