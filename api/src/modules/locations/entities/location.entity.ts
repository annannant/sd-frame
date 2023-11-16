import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
