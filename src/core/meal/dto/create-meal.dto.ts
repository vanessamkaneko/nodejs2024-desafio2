import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty({ message: 'A meal must have a name!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A meal must have a description!' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Is the meal part of the diet? True or false?' })
  @IsBoolean()
  on_diet: boolean;

  // data e hora???
}
