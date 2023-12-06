import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ProductionPlan } from '@/modules/production-plans/entities/production-plan.entity';
import { Location } from '@/modules/locations/entities/location.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';

@Entity('production_wood_summary')
export class ProductionWoodSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'production_plan_id', nullable: false })
  productionPlanId: number;

  // @Expose()
  // @Column({ name: 'item_no' })
  // itemNo: number;

  // full, part
  @Expose()
  @Column({ name: 'wood_type' })
  woodType: string;

  @Expose()
  @Column({ name: 'wood_item_stock_id' })
  woodItemStockId: number;

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
  @Column({ name: 'unit' })
  unit: string;

  @Expose()
  @Column({ name: 'total_qty' })
  totalQty: number;

  @Expose()
  @Column({ name: 'total_withdraw' })
  totalWithdraw: number;

  @Expose()
  @Column({ name: 'wood_id' })
  woodId: number;

  @Expose()
  @Column({ name: 'lot' })
  lot: number;

  @Expose()
  @Column({ name: 'location_id' })
  locationId: number;

  @ManyToOne(() => ProductionPlan, (plan) => plan.productionWoodSummary)
  @JoinColumn({ name: 'production_plan_id', referencedColumnName: 'id' })
  productionPlan: ProductionPlan;

  @OneToOne(() => Location)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: Location;

  @OneToOne(() => Wood)
  @JoinColumn({ name: 'wood_id', referencedColumnName: 'id' })
  wood: Wood;
}
