import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUserGateway } from 'src/application/operation/gateway/user/IUserGateway';
import { User } from '../entity/user.entity';

/* por default, não existe uma propriedade chamada currentUser no Request do Express, tendo que fazer essa modificação... */
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    @Inject(IUserGateway)
    private userGateway: IUserGateway,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userGateway.findUserById(userId);

      req.currentUser = user;
    }

    next();
  }
}
