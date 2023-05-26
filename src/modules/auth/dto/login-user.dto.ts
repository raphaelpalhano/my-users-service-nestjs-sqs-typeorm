import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
