import { PartialType } from '@nestjs/mapped-types';
import { CreateStandardFrameStockDto } from './create-standard-frame-stocks.dto';

export class UpdateStandardFrameStockDto extends PartialType(
  CreateStandardFrameStockDto,
) {}
