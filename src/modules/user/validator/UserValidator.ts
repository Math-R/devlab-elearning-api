import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserValidator {
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
