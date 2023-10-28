import { Module } from '@nestjs/common';
import { WoodsService } from './woods.service';
import { WoodsController } from './woods.controller';
import { Wood } from './entities/wood.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Wood])],
  controllers: [WoodsController],
  providers: [WoodsService],
})
export class WoodsModule {}
