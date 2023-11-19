import { PartialType } from '@nestjs/mapped-types';
import { CreateStandardFrameDto } from './create-standard-frame.dto';

export class UpdateStandardFrameDto extends PartialType(
  CreateStandardFrameDto,
) {}
