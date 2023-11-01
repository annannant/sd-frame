import { PartialType } from '@nestjs/mapped-types';
import { CreateWoodItemStockDto } from './create-wood-item-stock.dto';

export class UpdateWoodItemStockDto extends PartialType(CreateWoodItemStockDto) {}
