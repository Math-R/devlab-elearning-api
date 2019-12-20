import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterPayload {
  @ApiModelProperty({
    required: true,
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiModelProperty({
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  password: string;

  @ApiModelProperty({
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  username: string;

  description: string;

  type: string;
}
