import { ProductionOrderItem } from '@/modules/production-order-items/entities/production-order-item.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import { Expose } from 'class-transformer';
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

  @Expose()
  @Column({ name: 'wood_id' })
  woodId: number;

  @Expose()
  @Column({ name: 'order_no' })
  orderNo: string;

  @Expose()
  @Column({ name: 'status' })
  status: string;

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
