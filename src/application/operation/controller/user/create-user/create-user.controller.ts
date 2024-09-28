import { Inject } from '@nestjs/common';
import { CreateUserDto } from 'src/core/user/dto/create-user.dto';
import { User } from 'src/core/user/entity/user.entity';
import { CreateUserUseCase } from 'src/core/user/usecase/create-user/create-user.usecase';

export class CreateUserController {
  constructor(
    @Inject(CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(user: CreateUserDto): Promise<User> {
    const createUser = await this.createUserUseCase.execute(user);
    return createUser;
  }
}
