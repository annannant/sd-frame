import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
export class UpdateStatusProductionPlanWoodItemDto {
  @IsOptional()
  @IsString()
  cuttingStatus?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  ids?: number[];
}
