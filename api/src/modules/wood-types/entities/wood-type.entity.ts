import { Wood } from '@/modules/woods/entities/wood.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('wood_type')
export class WoodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({
    name: 'width',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  width: number;

  @Column({
    name: 'height',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  height: number;

  @Column({
    name: 'length',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  length: number;

  @Column({ name: 'size_unit', nullable: true })
  sizeUnit: string;

  @Column({ name: 'qty_perbox', nullable: true })
  qtyPerbox: number;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl: string;

  // @ManyToOne(() => Wood, (wood) => wood.photos)
  // woods: Wood;
}
