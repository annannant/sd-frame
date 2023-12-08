import { ProductionOrderItem } from '@/modules/production-order-items/entities/production-order-item.entity';
import { ProductionOrder } from '@/modules/production-orders/entities/production-order.entity';
import { ProductionPlanSuggestItem } from '@/modules/production-plan-suggest-items/entities/production-plan-suggest-item.entity';
import { ProductionPlanWood } from '@/modules/production-plan-woods/entities/production-plan-wood.entity';
import { ProductionWoodSummary } from '@/modules/production-wood-summary/entities/production-wood-summary.entity';
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
  OneToOne,
} from 'typeorm';

@Entity('production_plan')
export class ProductionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'wood_lot' })
  woodLot: number;

  @Expose()
  @Column({
    name: 'spare_part',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  sparePart: number;

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

  @OneToOne(() => ProductionOrder)
  @JoinColumn({ name: 'id', referencedColumnName: 'productionPlanId' })
  productionOrder: ProductionOrder;

  @OneToMany(() => ProductionPlanSuggestItem, (item) => item.productionPlan)
  productionPlanSuggestItems: ProductionPlanSuggestItem[];

  @OneToMany(() => ProductionPlanWood, (item) => item.productionPlan)
  productionPlanWoods: ProductionPlanWood[];

  @OneToMany(() => ProductionWoodSummary, (item) => item.productionPlan)
  productionWoodSummary: ProductionWoodSummary[];
}
