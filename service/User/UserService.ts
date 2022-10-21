import { UserAPI } from "~~/API/User/UserAPI";
import { UserParser } from "~~/parser/User/UserParser";
import { HttpService } from "~~/shared/Http/HttpService";
import { logError } from "~~/utils/logError";
import { UserEntity } from "~~/entity/User/UserEntity";
import { ProcessService } from "../Core/ProcessService";
import {
    TUserOutputDataSchema,
    TUserParserOutputData,
} from "~~/parser/User/UserParser.types";
import {
    TUserInputDataSchema,
    TUserParserInputData,
} from "~~/entity/User/UserEntity.types";
import { IUserService } from "./UserService.types";
import { ICRUDRepository } from "~~/shared/types";

export class UserService
    extends ProcessService<
        TUserInputDataSchema,
        TUserOutputDataSchema,
        TUserParserInputData,
        TUserParserOutputData
    >
    implements ICRUDRepository<TUserParserOutputData>, IUserService
{
    _httpService: HttpService = new HttpService();
    _userAPI: UserAPI = new UserAPI();
    constructor() {
        super({
            modelParser: new UserParser(),
            ModelEntity: UserEntity,
        });
    }
    async getOne(id: string): Promise<TUserParserOutputData> {
        try {
            // We can't know type (only expect!) from DB without run-time validation
            const fetchedData = await this._httpService.run({
                apiCallback: () => this._userAPI.getOneUser(id),
            });

            //* Validate and transform data
            const transformedData = this.processData(fetchedData as unknown);
            return transformedData;
        } catch (e) {
            logError(e);
        }
    }
}
