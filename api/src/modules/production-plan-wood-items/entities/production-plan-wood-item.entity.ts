import { ProductionOrderItem } from '@/modules/production-order-items/entities/production-order-item.entity';
import { ProductionPlanWood } from '@/modules/production-plan-woods/entities/production-plan-wood.entity';
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

@Entity('production_plan_wood_item')
export class ProductionPlanWoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'production_plan_wood_id' })
  productionPlanWoodId: number;

  @Expose()
  @Column({ name: 'production_plan_id' })
  productionPlanId: number;

  @Expose()
  @Column({
    name: 'length',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  length: number;

  // normal, wasted, keep
  @Expose()
  @Column({ name: 'type' })
  type: string;

  @Expose()
  @Column({ name: 'cutting_status' })
  cuttingStatus: string;

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

  @ManyToOne(() => ProductionPlanWood, (plan) => plan.productionPlanWoodItems)
  @JoinColumn({ name: 'production_plan_wood_id', referencedColumnName: 'id' })
  productionPlanWood: ProductionPlanWood;
}
