import { ProductionOrder } from '@/modules/production-orders/entities/production-order.entity';
import { StandardFrame } from '@/modules/standard-frames/entities/standard-frame.entity';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('production_plan_item')
export class ProductionPlanItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'production_plan_id' })
  productionPlanId: number;

  @Expose()
  @Column({ name: 'name' })
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
  @Column({ name: 'qty' })
  qty: number;

  @Expose()
  @Column({ name: 'is_custom_size' })
  isCustomSize: boolean;

  @Expose()
  @Column({ name: 'is_suggest' })
  isSuggest: boolean;
}
