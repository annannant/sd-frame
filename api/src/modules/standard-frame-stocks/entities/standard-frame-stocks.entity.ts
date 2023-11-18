import { StandardFrame } from '@/modules/standard-frames/entities/standard-frame.entity';
import { Wood } from '@/modules/woods/entities/wood.entity';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('standard_frame_stock')
export class StandardFrameStock {
  @PrimaryColumn({ name: 'standard_frame_id' })
  standardFrameId: number;

  @PrimaryColumn({ name: 'wood_id' })
  woodId: number;

  @Column({ name: 'reorder_point' })
  reorderPoint: number;

  @Column({ name: 'stock' })
  stock: number;

  @OneToOne(() => StandardFrame)
  @JoinColumn([{ name: 'standard_frame_id', referencedColumnName: 'id' }])
  standardFrame: StandardFrame;

  @OneToOne(() => Wood)
  @JoinColumn([{ name: 'wood_id', referencedColumnName: 'id' }])
  wood: Wood;
}
