import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('standard_frame')
export class StandardFrame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 255 })
  name: string;

  @Column({
    name: 'width',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  width: string;

  @Column({
    name: 'height',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  height: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'unit', length: 255 })
  unit: string;
}
