import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { format, parseISO } from 'date-fns';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value }: TransformFnParams) => {
    const parsedDate = parseISO(value);
    return format(parsedDate, 'yyyy-MM-dd');
  })
  @IsDateString()
  @IsOptional()
  birthDate: string;

  @IsString()
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 3,
  })
  password: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
