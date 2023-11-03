import { generateOrderNo } from '@/common/helpers/generator';
import { ProductionOrderItem } from '@/modules/production-order-items/entities/production-order-item.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('production_order')
export class ProductionOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wood_id' })
  woodId: number;

  @Column({ name: 'order_no' })
  orderNo: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @BeforeInsert()
  insertDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // @BeforeInsert()
  // async generateOrderNoHash(): Promise<void> {
  // this.orderNo = generateOrderNo();
  // }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => Wood, (wood) => wood.productionOrders)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;

  @OneToMany(() => ProductionOrderItem, (item) => item.productionOrder)
  productionOrderItems: ProductionOrderItem[];
}
