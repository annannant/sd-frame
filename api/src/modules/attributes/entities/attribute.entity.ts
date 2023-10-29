import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attribute')
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;
}
