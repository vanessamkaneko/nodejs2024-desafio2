import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
} from '@nestjs/common';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.userGateway.findUserById(userId);

      request.currentUser = user;
    }

    return handler.handle(); // "just go ahead and run the actual route handler"
  }
}
