import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsDateString({ strict: true })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
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
