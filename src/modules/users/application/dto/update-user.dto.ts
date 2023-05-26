import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsDateString({ strict: true })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @ApiProperty()
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
  @ApiProperty()
  password: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  age: number;
}
