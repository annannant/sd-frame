import { Location } from '@/modules/locations/entities/location.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('wood_stock_location')
export class WoodStockLocation {
  @PrimaryColumn({ name: 'wood_id' })
  woodId: number;

  @PrimaryColumn({ name: 'location_id' })
  locationId: number;

  @PrimaryColumn({ name: 'lot' })
  lot: number;

  @Column({ name: 'stock', nullable: true })
  stock: number;

  @ManyToOne(() => Wood, (user) => user.woodStockLocations)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;

  @ManyToOne(() => Location, (location) => location.woodStockLocations)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: Location;
}
