import {
  IsDate,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  @MinLength(36)
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsDateString({ strict: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @ApiProperty()
  birthDate: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
