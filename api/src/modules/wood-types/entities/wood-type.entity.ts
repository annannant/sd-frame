import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('wood_type')
export class WoodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'name', nullable: true })
  name: string;

  @Expose()
  @Column({ name: 'code', nullable: true })
  code: string;

  @Expose()
  @Column({ name: 'description', nullable: true })
  description: string;

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
  @Column({ name: 'size_unit', nullable: true })
  sizeUnit: string;

  @Expose()
  @Column({ name: 'qty_perbox', nullable: true })
  qtyPerbox: number;

  @Expose()
  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl: string;

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

  // @ManyToOne(() => Wood, (wood) => wood.photos)
  // woods: Wood;
}
