import { WoodStockLocation } from '@/modules/wood-stock-locations/entities/wood-stock-location.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address: string;

  @OneToMany(() => WoodStockLocation, (item) => item.location)
  woodStockLocations: WoodStockLocation[];
}
