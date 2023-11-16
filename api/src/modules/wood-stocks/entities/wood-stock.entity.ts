import { Wood } from '@/modules/woods/entities/wood.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('wood_stock')
export class WoodStock {
  @PrimaryColumn({ name: 'wood_id' })
  woodId: number;

  @PrimaryColumn({ name: 'lot' })
  lot: number;

  @Column({ name: 'total_stock', nullable: true })
  totalStock: number;

  @Column({ name: 'imported_at', nullable: true })
  importedAt: Date;

  @PrimaryColumn({ name: 'remark' })
  remark: string;

  @PrimaryColumn({ name: 'stock_unit' })
  stockUnit: string;

  @Column({ name: 'total_used', nullable: true })
  totalUsed: number;

  @ManyToOne(() => Wood, (wood) => wood.woodStocks)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;
}
