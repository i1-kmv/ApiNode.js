import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { NextFunction, Response, Request } from "express";
import {HttpError} from "../errors/http-error.class";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {path: "/register", method: "post", func: this.register},
            {path: "/login", method: "post", func: this.login}
        ])
    }

    login(req: Request, res:Response, next: NextFunction) {
        next(new HttpError(401, "Unauthorized", "register"));
    }

    register(req: Request, res:Response, next: NextFunction) {
        this.ok(res, "register");
    }
}
