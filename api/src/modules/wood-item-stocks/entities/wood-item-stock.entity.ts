// export class WoodItemStock {}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wood_item_stock')
export class WoodItemStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wood_id' })
  woodId: number;

  @Column({ name: 'location_id' })
  locationId: number;

  @Column({
    name: 'wood_length',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  woodLength: number;
}
