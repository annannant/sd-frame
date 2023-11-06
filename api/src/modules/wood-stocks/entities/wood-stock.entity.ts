import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('wood_stock')
export class WoodStock {
  @PrimaryColumn({ name: 'wood_id' })
  woodId: number;

  @PrimaryColumn({ name: 'lot' })
  lot: number;

  @Column({ name: 'total_stock_qty', nullable: true })
  totalStockQty: number;

  @Column({ name: 'imported_at', nullable: true })
  importedAt: Date;

  @Column({
    name: 'actual_wood_width',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  actualWoodWidth: number;

  @PrimaryColumn({ name: 'actual_wood_width_unit' })
  actualWoodWidthUnit: string;
}
