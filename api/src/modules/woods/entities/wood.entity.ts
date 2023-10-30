import { Attribute } from '@/modules/attributes/entities/attribute.entity';
import { ProductionOrder } from '@/modules/production-orders/entities/production-order.entity';
import { WoodType } from '@/modules/wood-types/entities/wood-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
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

  @OneToOne(() => WoodType)
  @JoinColumn({ name: 'wood_type_id' })
  woodType: WoodType;

  @OneToOne(() => Attribute)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;

  @OneToMany(() => ProductionOrder, (productionOrder) => productionOrder.woodId)
  productionOrders: ProductionOrder[];
}
