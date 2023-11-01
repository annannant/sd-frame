import { PartialType } from '@nestjs/mapped-types';
import { CreateWoodStockLocationDto } from './create-wood-stock-location.dto';

export class UpdateWoodStockLocationDto extends PartialType(CreateWoodStockLocationDto) {}
