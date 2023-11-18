import { Wood } from '@/modules/woods/entities/wood.entity';
import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('wood_stock')
export class WoodStock {
  @Expose()
  @PrimaryColumn({ name: 'wood_id' })
  woodId: number;

  @Expose()
  @PrimaryColumn({ name: 'lot' })
  lot: number;

  @Expose()
  @Column({ name: 'total_stock', nullable: true })
  totalStock: number;

  @Expose()
  @Column({ name: 'imported_at', nullable: true })
  importedAt: Date;

  @Expose()
  @Column({ name: 'remark' })
  remark: string;

  @Expose()
  @Column({ name: 'stock_unit' })
  stockUnit: string;

  @Expose()
  @Column({ name: 'total_used', nullable: true })
  totalUsed: number;

  @ManyToOne(() => Wood, (wood) => wood.woodStocks)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;
}
