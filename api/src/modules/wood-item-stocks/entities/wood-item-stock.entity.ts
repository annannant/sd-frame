// export class WoodItemStock {}

import { Location } from '@/modules/locations/entities/location.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('wood_item_stock')
export class WoodItemStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'wood_id' })
  woodId: number;

  @Expose()
  @Column({ name: 'location_id' })
  locationId: number;

  @Expose()
  @Column({ name: 'lot' })
  lot: number;

  @Expose()
  @Column({
    name: 'wood_length',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  woodLength: number;

  @Expose()
  @ManyToOne(() => Wood, (location) => location.woodItemStocks)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;

  @Expose()
  @ManyToOne(() => Location, (location) => location.woodItemStockLocations)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: Location;
}
