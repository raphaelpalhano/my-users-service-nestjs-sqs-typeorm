import { IsDate, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DeletedUserDto extends UserDto {
  @IsOptional()
  @IsDate()
  @ApiProperty()
  deletedAt: Date;
}
