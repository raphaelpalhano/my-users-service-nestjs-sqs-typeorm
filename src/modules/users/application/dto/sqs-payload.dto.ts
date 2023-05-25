import { UserDto } from './user.dto';

export interface SQSPayloadDto {
  eventType: string;
  user: UserDto;
}
