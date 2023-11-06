import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('wood_stock_location')
export class WoodStockLocation {
  @PrimaryColumn({ name: 'wood_stock_id' })
  woodStockId: number;

  @PrimaryColumn({ name: 'location_id' })
  locationId: number;

  @Column({ name: 'stock_qty', nullable: true })
  stockQty: number;
}
