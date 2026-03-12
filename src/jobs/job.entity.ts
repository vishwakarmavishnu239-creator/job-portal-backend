import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn } from 'typeorm';

@Entity()
export class Job {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column({nullable: true})
  description: string;

  @Column({ nullable: true })
  salary: string;

  @Column({ default: 'Full-time' })
  type: string;

  @Column({ default: 'Mid Level' })
  experience: string;

  @CreateDateColumn()
  createdAt: Date;
}

