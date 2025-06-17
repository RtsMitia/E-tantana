import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SimpleData } from '../SimpleData/SimpleData';
import { Hierarchy } from '../Hierarchy/Hierarchy';

@Entity('member_role')
export class MemberRole extends SimpleData {
    @ManyToOne((type) => Hierarchy)
    @JoinColumn({ name: 'hierarchy_id', referencedColumnName: 'id' })
    hierarchy: Hierarchy;

    @IsNotEmpty()
    @Column()
    hierarchy_id: number;

    @IsNotEmpty()
    @Column()
    level: string;
}
