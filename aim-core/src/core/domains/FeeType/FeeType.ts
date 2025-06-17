import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityField } from '../ActivityField/ActivityField';
import { SimpleData } from '../SimpleData/SimpleData';

@Entity('fee_type')
export class FeeType extends SimpleData {
    @ManyToOne((type) => ActivityField)
    @JoinColumn({ name: 'activity_field_id', referencedColumnName: 'id' })
    activityField: ActivityField;

    @IsOptional()
    @Column()
    activity_field_id: number;
}
