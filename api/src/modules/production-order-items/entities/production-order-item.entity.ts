import { ProductionOrder } from '@/modules/production-orders/entities/production-order.entity';
import { StandardFrame } from '@/modules/standard-frames/entities/standard-frame.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('production_order_item')
export class ProductionOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'width',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  width: number;

  @Column({
    name: 'height',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  height: number;

  @Column({ name: 'qty' })
  qty: number;

  @Column({ name: 'is_custom_size' })
  isCustomSize: boolean;

  @Column({ name: 'production_order_id' })
  productionOrderId: number;

  @Column({ name: 'standard_frame_id' })
  standardFrameId: number;

  @Column({ name: 'standard_frame_name' })
  standardFrameName: string;

  @ManyToOne(() => ProductionOrder, (order) => order.productionOrderItems)
  @JoinColumn({ name: 'production_order_id', referencedColumnName: 'id' })
  productionOrder: ProductionOrder;

  @OneToMany(() => StandardFrame, (item) => item.productionOrderItem)
  standardFrames: StandardFrame[];

  @OneToOne(() => StandardFrame)
  @JoinColumn([{ name: 'standard_frame_id', referencedColumnName: 'id' }])
  standardFrame: StandardFrame;
}
