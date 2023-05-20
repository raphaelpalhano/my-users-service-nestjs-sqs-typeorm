import {
  IsDate,
  IsEmail,
  IsNegative,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { parseISO } from 'date-fns';
import { Transform } from 'class-transformer';

export class UserDto {
  @IsOptional()
  @IsNegative()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @Transform(({ value }) => parseISO(value))
  @IsDate()
  @IsOptional()
  birthDate: Date;
}
