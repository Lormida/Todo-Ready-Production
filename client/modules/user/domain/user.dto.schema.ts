import { z } from "zod";

export enum TEnumGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}
export enum TEnumRole {
    STANDARD = "STANDARD",
    ADMIN = "ADMIN",
}

export const userDTOSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        gender: z.nativeEnum(TEnumGender),
        role: z.nativeEnum(TEnumRole),
        tasks: z.string().optional().array().optional(),
        createdAt: z.string(),
    })
    .strict();

export type TUserDTOSchema = typeof userDTOSchema;
export type TUserDTO = z.infer<TUserDTOSchema>;
