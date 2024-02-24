import { App } from "./app.js";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ExeptionFilter } from "./errors/exeption.filter";

async function bootstrap() {
    const logger = new LoggerService();
    const userController = new UsersController(logger);
    const exeptionFilter = new ExeptionFilter(logger);
    const app = new App(logger, userController, exeptionFilter);
    await app.init();
};

bootstrap();
