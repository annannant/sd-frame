import { Attribute } from '@/modules/attributes/entities/attribute.entity';
import { ProductionOrder } from '@/modules/production-orders/entities/production-order.entity';
import { WoodStockLocation } from '@/modules/wood-stock-locations/entities/wood-stock-location.entity';
import { WoodStock } from '@/modules/wood-stocks/entities/wood-stock.entity';
import { WoodType } from '@/modules/wood-types/entities/wood-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('wood')
export class Wood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wood_type_id', nullable: true })
  woodTypeId: number;

  @Column({ name: 'attribute_id', nullable: true })
  attributeId: number;

  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl: string;

  @ManyToOne(() => WoodType, (user) => user.woods)
  @JoinColumn({ name: 'wood_type_id', referencedColumnName: 'id' })
  woodType: WoodType;

  @OneToOne(() => Attribute)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @OneToMany(() => ProductionOrder, (productionOrder) => productionOrder.woodId)
  productionOrders: ProductionOrder[];

  @OneToMany(() => WoodStock, (item) => item.wood)
  woodStocks: WoodStock[];

  @OneToMany(() => WoodStockLocation, (item) => item.wood)
  woodStockLocations: WoodStockLocation[];
}
