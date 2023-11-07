import { Module } from '@nestjs/common';
import { WoodTypesService } from './wood-types.service';
import { WoodTypesController } from './wood-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WoodType } from './entities/wood-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WoodType])],
  controllers: [WoodTypesController],
  providers: [WoodTypesService],
})
export class WoodTypesModule {}
