import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'department' })
  department: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role' })
  role: string;
}
