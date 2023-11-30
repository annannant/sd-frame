import { IsOptional, IsString } from 'class-validator';

export class QueryProductionOrderDto {
  @IsOptional()
  @IsString()
  statuses?: string = '';

  @IsOptional()
  @IsString()
  debug?: string = '';
}
