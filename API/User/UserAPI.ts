import { AsyncData } from "#app";
import { TUserParserInputData } from "~~/entity/User/UserEntity.types";
import { BASE_URL } from "~~/utils/constants";
import { IUserAPI } from "./UserAPI.types";

export class UserAPI implements IUserAPI {
    async getOne(
        id: string
    ): Promise<
        AsyncData<
            TUserParserInputData,
            true | { message: string; name: string }
        >
    > {
        return useFetch(`/users`, {
            method: "GET",
            baseURL: BASE_URL,
        });
    }
    async getMany(): Promise<
        AsyncData<
            TUserParserInputData[],
            true | { message: string; name: string }
        >
    > {
        return useFetch(`/users`, {
            method: "GET",
            baseURL: BASE_URL,
        }) as AsyncData<
            TUserParserInputData[],
            true | { message: string; name: string }
        >;
    }
    async create(
        user: TUserParserInputData
    ): Promise<
        AsyncData<
            TUserParserInputData,
            true | { message: string; name: string }
        >
    > {
        return useFetch(`/users?createUser=true`, {
            method: "POST",
            baseURL: BASE_URL,
            body: user,
        });
    }
    async remove(
        id: string
    ): Promise<
        AsyncData<
            TUserParserInputData,
            true | { message: string; name: string }
        >
    > {
        return useFetch(`/users/${id}`, {
            method: "DELETE",
            baseURL: BASE_URL,
        });
    }
    async edit({
        id,
        user,
    }: {
        id: string;
        user: TUserParserInputData;
    }): Promise<
        AsyncData<
            TUserParserInputData,
            true | { message: string; name: string }
        >
    > {
        return useFetch(`/users/${id}`, {
            method: "PUT",
            baseURL: BASE_URL,
            body: user,
        });
    }
}
