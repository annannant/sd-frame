import { Location } from '@/modules/locations/entities/location.entity';
import { WoodStock } from '@/modules/wood-stocks/entities/wood-stock.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  VirtualColumn,
  AfterLoad,
} from 'typeorm';

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
  @Column({ name: 'used', nullable: true })
  used: number;

  protected remaining: number;

  @AfterLoad()
  getRemaining() {
    this.remaining = (this.stock ?? 0) - (this.used ?? 0);
  }

  @ManyToOne(() => Location, (location) => location.woodStockLocations)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: Location;

  @ManyToOne(() => WoodStock, (woodStock) => woodStock.woodStockLocations)
  @JoinColumn([
    { name: 'wood_id', referencedColumnName: 'woodId' },
    { name: 'lot', referencedColumnName: 'lot' },
  ])
  woodStock: WoodStock;

  @ManyToOne(() => Wood, (wood) => wood.woodStockLocations)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;
}
