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

  @Expose()
  @Column({ name: 'wood_code' })
  woodCode: string;

  @Expose()
  @Column({ name: 'wood_name' })
  woodName: string;

  @Expose()
  @Column({ name: 'wood_description' })
  woodDescription: string;

  @Expose()
  @Column({ name: 'wood_type_code' })
  woodTypeCode: string;

  @Expose()
  @Column({ name: 'wood_type_name' })
  woodTypeName: string;

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
  @Column({
    name: 'length',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  length: number;

  @Expose()
  @Column({ name: 'size_unit' })
  sizeUnit: string;

  @Expose()
  @Column({ name: 'attribute_code' })
  attributeCode: string;

  @Expose()
  @Column({ name: 'production_plan_id' })
  productionPlanId: number;

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
