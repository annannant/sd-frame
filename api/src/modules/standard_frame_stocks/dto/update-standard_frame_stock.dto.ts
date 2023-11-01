import { PartialType } from '@nestjs/mapped-types';
import { CreateStandardFrameStockDto } from './create-standard_frame_stock.dto';

export class UpdateStandardFrameStockDto extends PartialType(CreateStandardFrameStockDto) {}
