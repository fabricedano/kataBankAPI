import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user';

@Entity()
export class AccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ default: 0 })
    solde: number;
    @ManyToOne(type => UserEntity, user => user.accounts)
    user: UserEntity;
}
