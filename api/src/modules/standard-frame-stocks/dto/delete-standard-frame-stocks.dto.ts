import { PartialType } from '@nestjs/mapped-types';
import { UpdateStandardFrameStockDto } from './update-standard-frame-stocks.dto';

export class DeleteStandardFrameStockDto extends PartialType(
  UpdateStandardFrameStockDto,
) {}
