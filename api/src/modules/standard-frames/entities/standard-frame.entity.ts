import { ProductionOrderItem } from '@/modules/production-order-items/entities/production-order-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('standard_frame')
export class StandardFrame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 255 })
  name: string;

  @Column({
    name: 'width',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  width: number;

  @Column({
    name: 'height',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  height: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'unit', length: 255 })
  unit: string;

  @ManyToOne(() => ProductionOrderItem, (order) => order.standardFrames)
  @JoinColumn([
    { name: 'width', referencedColumnName: 'width' },
    { name: 'height', referencedColumnName: 'height' },
  ])
  productionOrderItem: ProductionOrderItem;
}
