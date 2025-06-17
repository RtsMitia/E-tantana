import { IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityFieldSection } from '../ActivityFieldSection/ActivityFieldSection';
import { SimpleData } from '../SimpleData/SimpleData';

@Entity('group_section')
export class GroupSection extends SimpleData {
    @ManyToOne((type) => ActivityFieldSection)
    @JoinColumn({
        name: 'activity_field_section_id',
        referencedColumnName: 'id',
    })
    activityFieldSection: ActivityFieldSection;

    @IsOptional()
    @Column()
    activity_field_section_id: number;
}
