import { IsOptional, IsString } from 'class-validator';

export class QueryStandardFrameStockDto {
  @IsOptional()
  @IsString()
  woodId?: string = '';

  @IsOptional()
  @IsString()
  standardFrameId?: string = '';
}
