import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('production_order_item')
export class ProductionOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ name: 'qty' })
  qty: number;

  @Column({ name: 'is_custom_size' })
  isCustomSize: boolean;

  @Column({ name: 'production_order_id' })
  productionOrderId: number;
}
