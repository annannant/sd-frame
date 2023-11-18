import { Location } from '@/modules/locations/entities/location.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('wood_stock_location')
export class WoodStockLocation {
  @Expose()
  @PrimaryColumn({ name: 'wood_id' })
  woodId: number;

  @Expose()
  @PrimaryColumn({ name: 'location_id' })
  locationId: number;

  @Expose()
  @PrimaryColumn({ name: 'lot' })
  lot: number;

  @Expose()
  @Column({ name: 'stock', nullable: true })
  stock: number;

  @Expose()
  @ManyToOne(() => Wood, (user) => user.woodStockLocations)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;

  @Expose()
  @ManyToOne(() => Location, (location) => location.woodStockLocations)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: Location;
}
