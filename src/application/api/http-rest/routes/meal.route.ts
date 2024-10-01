import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateMealController } from 'src/application/operation/controller/meal/create-meal/create-meal.controller';
import { UpdateMealController } from 'src/application/operation/controller/meal/update-meal/update-meal.controller';
import { CreateMealDto } from 'src/core/meal/dto/create-meal.dto';
import { UpdateMealDto } from 'src/core/meal/dto/update-meal.dto';
import { Meal } from 'src/core/meal/entity/meal.entity';

@Controller('/meal')
export class MealControllerRoute {
  constructor(
    private createMealController: CreateMealController,
    private updateMealController: UpdateMealController,
  ) {}

  @Post('/create')
  async create(@Body() meal: CreateMealDto): Promise<Meal> {
    const createMeal = await this.createMealController.handle(meal);
    return createMeal;
  }

  @Put('/edit/:id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateMealDto,
  ): Promise<Meal> {
    const updateMeal = await this.updateMealController.handle(id, payload);
    return updateMeal;
  }
}
