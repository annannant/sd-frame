import { ProductionOrderItem } from '@/modules/production-order-items/entities/production-order-item.entity';
import { StandardFrameStock } from '@/modules/standard-frame-stocks/entities/standard-frame-stocks.entity';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@Entity('standard_frame')
export class StandardFrame {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'name', length: 255 })
  name: string;

  @Expose()
  @Column({
    name: 'width',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  width: number;

  @Expose()
  @Column({
    name: 'height',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  height: number;

  @Expose()
  @Column({ name: 'is_active' })
  isActive: boolean;

  @Expose()
  @Column({ name: 'unit', length: 255 })
  unit: string;

  @Expose()
  @Column({ name: 'default_reorder_point' })
  defaultReorderPoint: number;

  @Expose()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Expose()
  @Column({ name: 'created_by' })
  createdBy: string;

  @Expose()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Expose()
  @Column({ name: 'updated_by' })
  updatedBy: string;

  @BeforeInsert()
  insertDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => ProductionOrderItem, (order) => order.standardFrames)
  @JoinColumn([
    { name: 'width', referencedColumnName: 'width' },
    { name: 'height', referencedColumnName: 'height' },
  ])
  productionOrderItem: ProductionOrderItem;

  @OneToMany(() => StandardFrameStock, (item) => item.standardFrame)
  standardFrameStocks: StandardFrameStock[];
}
