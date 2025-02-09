import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('member')
export class MemberEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'member_id'
    })
    memberId: number;

    @Column('varchar', {
        name: 'name'
    })
    name: string;

    @Column('tinyint', {
        name: 'age'
    })
    age: number;

    @Column('varchar', {
        name: 'email'
    })
    email: string;
}
