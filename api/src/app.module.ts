import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import { UserModule } from './modules/users/users.module';
import { Wood } from './modules/woods/entities/wood.entity';
import { WoodsModule } from './modules/woods/woods.module';
import { WoodType } from './modules/wood-types/entities/wood-type.entity';
import { WoodTypesModule } from './modules/wood-types/wood-types.module';
import { Attribute } from './modules/attributes/entities/attribute.entity';
import { AttributesModule } from './modules/attributes/attributes.module';
import { StandardFramesModule } from './modules/standard-frames/standard-frames.module';
import { StandardFrame } from './modules/standard-frames/entities/standard-frame.entity';
import { ProductionOrdersModule } from './modules/production-orders/production-orders.module';
import { ProductionOrderItemsModule } from './modules/production-order-items/production-order-items.module';
import { ProductionOrder } from './modules/production-orders/entities/production-order.entity';
import { ProductionOrderItem } from './modules/production-order-items/entities/production-order-item.entity';
import { WoodItemStock } from './modules/wood-item-stocks/entities/wood-item-stock.entity';
import { WoodItemStocksModule } from './modules/wood-item-stocks/wood-item-stocks.module';
import { StandardFrameStock } from './modules/standard-frame-stocks/entities/standard-frame-stocks.entity';
import { WoodStockLocation } from './modules/wood-stock-locations/entities/wood-stock-location.entity';
import { Location } from './modules/locations/entities/location.entity';
import { WoodStockLocationsModule } from './modules/wood-stock-locations/wood-stock-locations.module';
import { LocationsModule } from './modules/locations/locations.module';
import { WoodStock } from './modules/wood-stocks/entities/wood-stock.entity';
import { WoodStocksModule } from './modules/wood-stocks/wood-stocks.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { StandardFrameStocksModule } from './modules/standard-frame-stocks/standard-frame-stocks.module';
import { ProductionPlansModule } from './modules/production-plans/production-plans.module';
import { ProductionPlanWoodsModule } from './modules/production-plan-woods/production-plan-woods.module';
import { ProductionPlanWoodItemsModule } from './modules/production-plan-wood-items/production-plan-wood-items.module';
import { ProductionWoodSummaryModule } from './modules/production-wood-summary/production-wood-summary.module';
import { ProductionPlan } from './modules/production-plans/entities/production-plan.entity';
import { ProductionPlanWood } from './modules/production-plan-woods/entities/production-plan-wood.entity';
import { ProductionPlanWoodItem } from './modules/production-plan-wood-items/entities/production-plan-wood-item.entity';
import { ProductionWoodSummary } from './modules/production-wood-summary/entities/production-wood-summary.entity';
import { ProductionPlanSuggestItemsModule } from './modules/production-plan-suggest-items/production-plan-suggest-items.module';
import { ProductionPlanSuggestItem } from './modules/production-plan-suggest-items/entities/production-plan-suggest-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: '@secret!',
      database: 'sd-frame-db',
      entities: [
        User,
        Wood,
        WoodType,
        Attribute,
        StandardFrame,
        ProductionOrder,
        ProductionOrderItem,
        WoodItemStock,
        StandardFrameStock,
        WoodStock,
        WoodStockLocation,
        Location,

        ProductionPlan,
        ProductionPlanSuggestItem,
        ProductionPlanWood,
        ProductionPlanWoodItem,
        ProductionWoodSummary,
      ],
      autoLoadEntities: true,
      // synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    UserModule,
    WoodsModule,
    WoodTypesModule,
    AttributesModule,
    StandardFramesModule,
    ProductionOrdersModule,
    ProductionOrderItemsModule,
    WoodItemStocksModule,
    StandardFramesModule,
    WoodStocksModule,
    WoodStockLocationsModule,
    LocationsModule,
    UploadsModule,
    StandardFrameStocksModule,

    ProductionPlansModule,
    ProductionPlanSuggestItemsModule,
    ProductionPlanWoodsModule,
    ProductionPlanWoodItemsModule,
    ProductionWoodSummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
