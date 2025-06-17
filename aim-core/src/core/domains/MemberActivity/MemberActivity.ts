import { IsNotEmpty, IsOptional } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ActivityField } from '../ActivityField/ActivityField';
import { ActivityYear } from '../ActivityYear/ActivityYear';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Member } from '../Member/Member';
import { MemberRole } from '../MemberRole/MemberRole';
import { Section } from '../Section/Section';

@Entity('member_activity')
export class MemberActivity extends GeneralDto {
    @IsNotEmpty()
    @Column()
    member_id: number;

    @ManyToOne((type) => Member)
    @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    member: Member;

    @ManyToOne((type) => ActivityField)
    @JoinColumn({ name: 'activity_field_id', referencedColumnName: 'id' })
    activityField: ActivityField;

    @ManyToOne((type) => ActivityYear)
    @JoinColumn({ name: 'activity_year_id', referencedColumnName: 'id' })
    activityYear: ActivityYear;

    @IsNotEmpty()
    @Column()
    activity_field_id: number;

    @IsNotEmpty()
    @Column()
    activity_year_id: number;

    @IsNotEmpty()
    @Column()
    member_role_id: number;

    @ManyToOne((type) => MemberRole)
    @JoinColumn({ name: 'member_role_id', referencedColumnName: 'id' })
    memberRole: MemberRole;

    @ManyToOne((type) => Section)
    @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
    section: Section;

    @IsOptional()
    @Column()
    section_id?: number;

    @IsOptional()
    @Column()
    note_role: string;

    @IsOptional()
    @Column()
    level: string;
}
