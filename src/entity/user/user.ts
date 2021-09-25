import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account';
@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    address: string;
    @Column()
    password: string;
    @OneToMany(type => AccountEntity, account => account.user)
    accounts: AccountEntity[];
}
