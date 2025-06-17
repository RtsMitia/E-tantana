import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityYear } from '../ActivityYear/ActivityYear';
import { FeeType } from '../FeeType/FeeType';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Hierarchy } from '../Hierarchy/Hierarchy';
import { MemberRole } from '../MemberRole/MemberRole';
import { Section } from '../Section/Section';

@Entity('membership_fee')
export class MembershipFee extends GeneralDto {
    @ManyToOne((type) => Section)
    @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
    section: Section;

    @ManyToOne((type) => Hierarchy)
    @JoinColumn({ name: 'hierarchy_id', referencedColumnName: 'id' })
    hierarchy: Hierarchy;

    @ManyToOne((type) => MemberRole)
    @JoinColumn({ name: 'member_role_id', referencedColumnName: 'id' })
    memberRole: MemberRole;

    @ManyToOne((type) => ActivityYear)
    @JoinColumn({ name: 'activity_year_id', referencedColumnName: 'id' })
    activityYear: ActivityYear;

    @ManyToOne((type) => FeeType)
    @JoinColumn({ name: 'fee_type_id', referencedColumnName: 'id' })
    feeType: FeeType;

    @IsOptional()
    @Column()
    hierarchy_id: number;

    @IsNotEmpty()
    @Column()
    member_role_id: number;

    @IsNotEmpty()
    @Column()
    activity_year_id: number;

    @IsNotEmpty()
    @Column()
    fee_type_id: number;

    @IsNotEmpty()
    @Column()
    amount: number;

    @IsOptional()
    @Column()
    section_id: number;

    @IsOptional()
    @Column()
    status: string;
}
