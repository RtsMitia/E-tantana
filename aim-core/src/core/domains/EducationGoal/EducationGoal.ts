import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EducationField } from '../EducationField/EducationField';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { SectionStep } from '../SectionStep/SectionStep';

@Entity('education_goal')
export class EducationGoal extends GeneralDto {
    @ManyToOne((type) => EducationField)
    @JoinColumn({ name: 'education_field_id', referencedColumnName: 'id' })
    educationField: EducationField;

    @ManyToOne((type) => SectionStep)
    @JoinColumn({ name: 'section_steps_id', referencedColumnName: 'id' })
    sectionStep: SectionStep;

    @IsNotEmpty()
    @Column()
    education_field_id: number;

    @IsNotEmpty()
    @Column()
    section_steps_id: number;

    @IsNotEmpty()
    @Column()
    education_goal: string;
}
