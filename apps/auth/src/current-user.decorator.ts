import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UsersDocument } from "./users/models/users.schema";

const getCurrentUserData = (context: ExecutionContext): UsersDocument => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUserDecorator = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserData(context)
);