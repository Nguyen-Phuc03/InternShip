import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column()
  name: string;
  @Column()
  email: string;
}
