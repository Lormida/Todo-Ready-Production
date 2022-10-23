import { CoreService } from "~~/app/modules/core/infrastructure/Service/CoreService";
import { logError } from "~~/app/shared/utils/logError";
import { UserEntity } from "../../domain/entity/UserEntity";
import {
    TUserInputDataSchema,
    TUserParserInputData,
} from "../../domain/entity/UserEntity.types";
import { UserAPI } from "../API/UserAPI";
import { UserParser } from "../Parser/UserParser";
import {
    TUserOutputDataSchema,
    TUserParserOutputData,
} from "../Parser/UserParser.types";
import { IUserServiceOperations } from "./IUserServiceOperations.types";

export class UserService
    extends CoreService<
        TUserInputDataSchema,
        TUserOutputDataSchema,
        TUserParserInputData,
        TUserParserOutputData
    >
    implements IUserServiceOperations
{
    constructor() {
        super({
            coreAPI: new UserAPI(),
            modelParser: new UserParser(),
            ModelEntity: UserEntity,
        });
    }
    async getUserById(id: string): Promise<TUserParserOutputData> {
        try {
            // We can't know type (only expect!) from DB without run-time validation
            const fetchedData = await this.httpService.run({
                apiCallback: () => this.coreAPI.getOne(id),
            });

            //* Validate and transform data
            const transformedData = this.processData(fetchedData as unknown);
            return transformedData;
        } catch (e) {
            logError(e);
        }
    }
}
