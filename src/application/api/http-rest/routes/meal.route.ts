import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/application/guard/auth.guard';
import { CreateMealController } from 'src/application/operation/controller/meal/create-meal/create-meal.controller';
import { DeleteMealController } from 'src/application/operation/controller/meal/delete-meal/delete-meal.controller';
import { GetMealController } from 'src/application/operation/controller/meal/get-meal/get-meal.controller';
import { UpdateMealController } from 'src/application/operation/controller/meal/update-meal/update-meal.controller';
import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';
import { CurrentUserInterceptor } from 'src/core/user/interceptor/current-user.interceptor';

@Controller('/meal')
@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
export class MealControllerRoute {
  constructor(
    private createMealController: CreateMealController,
    private updateMealController: UpdateMealController,
    private deleteMealController: DeleteMealController,
    private getMealController: GetMealController,
  ) {}

  @Post('/create')
  async create(
    @Body() meal: CreateMealDto,
    @Session() session: any,
  ): Promise<Meal> {
    const createMeal = await this.createMealController.handle(
      meal,
      session.userId,
    );
    return createMeal;
  }

  @Put('/edit/:id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateMealDto,
    @Session() session: any,
  ): Promise<Meal> {
    const updateMeal = await this.updateMealController.handle(
      id,
      payload,
      session.userId,
    );
    return updateMeal;
  }

  @Delete('/delete/:id')
  async delete(
    @Param('id') id: string,
    @Session() session: any,
  ): Promise<void> {
    const deleteMeal = await this.deleteMealController.handle(
      id,
      session.userId,
    );

    return deleteMeal;
  }

  @Get('/:id')
  async getMeal(
    @Param('id') id: string,
    @Session() session: any,
  ): Promise<Meal> {
    const meal = await this.getMealController.handle(id, session.userId);

    return meal;
  }
}

//66fdce48c021f1e3bedfd826
