import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityField } from '../ActivityField/ActivityField';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Section } from '../Section/Section';

@Entity('activity_field_section')
export class ActivityFieldSection extends GeneralDto {
    @ManyToOne((type) => ActivityField)
    @JoinColumn({ name: 'activity_field_id', referencedColumnName: 'id' })
    activityField: ActivityField;

    @ManyToOne((type) => Section)
    @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
    section: Section;

    @IsNotEmpty()
    @Column()
    activity_field_id: number;

    @IsNotEmpty()
    @Column()
    section_id: number;
}
