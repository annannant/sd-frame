import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wood_type')
export class WoodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'width' })
  width: number;

  @Column({ name: 'height' })
  height: number;

  @Column({ name: 'length' })
  length: number;

  @Column({ name: 'size_unit' })
  sizeUnit: string;

  @Column({ name: 'qty_perbox' })
  qtyPerbox: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  // @Column({ name: 'first_name' })
  // firstName: string;

  // @Column({ name: 'last_name' })
  // lastName: string;

  // @Column({ name: 'is_active' })
  // isActive: boolean;
}
