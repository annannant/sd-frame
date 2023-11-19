import { StandardFrame } from '@/modules/standard-frames/entities/standard-frame.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('standard_frame_stock')
export class StandardFrameStock {
  @Expose()
  @PrimaryColumn({ name: 'standard_frame_id' })
  standardFrameId: number;

  @Expose()
  @PrimaryColumn({ name: 'wood_id' })
  woodId: number;

  @Expose()
  @Column({ name: 'reorder_point' })
  reorderPoint: number;

  @Expose()
  @Column({ name: 'stock' })
  stock: number;

  @Expose()
  @ManyToOne(() => StandardFrame)
  @JoinColumn([{ name: 'standard_frame_id', referencedColumnName: 'id' }])
  standardFrame: StandardFrame;

  @Expose()
  @OneToOne(() => Wood)
  @JoinColumn([{ name: 'wood_id', referencedColumnName: 'id' }])
  wood: Wood;

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
