import { UseCaseCore } from "~~/app/modules/core/application/core.usecase";
import {
    TUserOptionsLogin,
    TUserOptionsSignup,
} from "~~/src/Auth/infrastructure/Service/auth.service.types";
import { AuthService } from "../infrastructure/Service/auth.service";

type TOutputSignupData = any;

export class Signup extends UseCaseCore<TUserOptionsSignup, TOutputSignupData> {
    constructor() {
        super((userOptions: TUserOptionsSignup) => {
            const authService = new AuthService();
            return authService.signup(userOptions);
        });
    }
}
