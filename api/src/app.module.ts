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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: '@secret!',
      database: 'sd-frame-db',
      entities: [User, Wood, WoodType, Attribute],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}