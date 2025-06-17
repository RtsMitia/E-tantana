import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { GroupSection } from '../GroupSection/GroupSection';
import { MemberActivity } from '../MemberActivity/MemberActivity';

@Entity('member_group_name')
export class MemberGroupName extends GeneralDto {
    @ManyToOne((type) => GroupSection)
    @JoinColumn({ name: 'group_section_id', referencedColumnName: 'id' })
    groupSection: GroupSection;

    @ManyToOne((type) => MemberActivity)
    @JoinColumn({ name: 'member_activity_id', referencedColumnName: 'id' })
    memberActivity: MemberActivity;

    @IsNotEmpty()
    @Column()
    group_section_id: number;

    @IsNotEmpty()
    @Column()
    member_activity_id: number;
}
