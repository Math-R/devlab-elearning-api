import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCourseValidator {
  @ApiModelProperty({
    required: true,
    type: 'string',
  })
  @IsEmail()
  title: string;

  @ApiModelProperty({
    type: 'string',
  })
  @IsNotEmpty()
  estimatedTime: number;

  @ApiModelProperty({
    type: 'string',
  })
  @IsNotEmpty()
  description: string;


  @ApiModelProperty({
    type: 'Chapters',
  })
  @IsNotEmpty()
  chapters: [];
  // CreateChapterValidator

  @ApiModelProperty({
    type: 'files',
  })
  @IsNotEmpty()
  files: [];

  type: string;
}
