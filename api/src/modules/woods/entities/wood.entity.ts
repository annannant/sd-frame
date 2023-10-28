import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('wood')
export class Wood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wood_type_id' })
  woodTypeId: number;

  @Column({ name: 'attribute_id' })
  attributeId: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  // @OneToOne(() => Profile)
  // @JoinColumn()
  // woodType: Profile;
}
