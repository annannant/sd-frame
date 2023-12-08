import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ProductionPlan } from '@/modules/production-plans/entities/production-plan.entity';
import { ProductionPlanWoodItem } from '@/modules/production-plan-wood-items/entities/production-plan-wood-item.entity';

@Entity('production_plan_wood')
export class ProductionPlanWood {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'production_plan_id', nullable: false })
  productionPlanId: number;

  @Expose()
  @Column({ name: 'wood_item_stock_id', nullable: true })
  woodItemStockId: number;

  // @Expose()
  // @Column({ name: 'item_no' })
  // itemNo: number;

  // full, part
  @Expose()
  @Column({ name: 'item_type' })
  itemType: string;

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

  @ManyToOne(() => ProductionPlan, (plan) => plan.productionPlanWoods)
  @JoinColumn({ name: 'production_plan_id', referencedColumnName: 'id' })
  productionPlan: ProductionPlan;

  @OneToMany(() => ProductionPlanWoodItem, (item) => item.productionPlanWood)
  productionPlanWoodItems: ProductionPlanWoodItem[];
}
