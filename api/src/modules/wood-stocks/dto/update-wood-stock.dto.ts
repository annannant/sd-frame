import { PartialType } from '@nestjs/mapped-types';
import { CreateWoodStockDto } from './create-wood-stock.dto';

export class UpdateWoodStockDto extends PartialType(CreateWoodStockDto) {}
