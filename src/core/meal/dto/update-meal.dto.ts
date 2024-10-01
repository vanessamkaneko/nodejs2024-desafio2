import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  on_diet?: boolean;

  // data e hora???
}
