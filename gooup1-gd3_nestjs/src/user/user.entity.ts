import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  email: string;
}
