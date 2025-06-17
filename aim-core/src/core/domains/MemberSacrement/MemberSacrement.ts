import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Member } from '../Member/Member';
import { Sacrement } from '../Sacrement/Sacrement';

@Entity('member_sacrement')
export class MemberSacrement extends GeneralDto {
    @ManyToOne((type) => Member)
    @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    member: Member;

    @ManyToOne((type) => Sacrement)
    @JoinColumn({ name: 'sacrement_id', referencedColumnName: 'id' })
    sacrement: Sacrement;

    @IsNotEmpty()
    @Column()
    date: Date;

    @IsNotEmpty()
    @Column()
    place: string;

    @IsNotEmpty()
    @Column()
    member_id: number;

    @IsNotEmpty()
    @Column()
    sacrement_id: number;
}
