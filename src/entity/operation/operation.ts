import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from '../account/account';
@Entity()
export class OperationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column()
    amount: number;
    @Column()
    date: Date;
    @ManyToOne(type => AccountEntity)
    @JoinColumn()
    account: AccountEntity;
}
