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
}
