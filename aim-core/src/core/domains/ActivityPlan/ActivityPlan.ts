import { IsNotEmpty, IsOptional } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { ActivityYear } from '../ActivityYear/ActivityYear';
import { ActivityFieldSection } from '../ActivityFieldSection/ActivityFieldSection';
import { ActivityField } from '../ActivityField/ActivityField';

@Entity('activity_plan')
export class ActivityPlan extends GeneralDto {
    @IsNotEmpty()
    @Column()
    activity_year_id: number;

    @IsOptional()
    @Column()
    activity_field_section_id: number;

    @IsNotEmpty()
    @Column()
    activity_field_id: number;

    @IsNotEmpty()
    @Column()
    start_month: number;

    @IsNotEmpty()
    @Column()
    end_month: number;

    @IsOptional()
    @Column()
    status: string;

    @IsOptional()
    @Column()
    note: string;

    @IsOptional()
    @Column()
    purpose: string;

    @ManyToOne((type) => ActivityField)
    @JoinColumn({ name: 'activity_field_id', referencedColumnName: 'id' })
    activityField: ActivityField;

    @ManyToOne((type) => ActivityFieldSection)
    @JoinColumn({
        name: 'activity_field_section_id',
        referencedColumnName: 'id',
    })
    activityFieldSection: ActivityFieldSection;

    @ManyToOne((type) => ActivityYear)
    @JoinColumn({ name: 'activity_year_id', referencedColumnName: 'id' })
    activityYear: ActivityYear;
}
