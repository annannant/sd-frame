import { IsBoolean, IsOptional } from 'class-validator';

export class CreateStandardFrameDto {
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
