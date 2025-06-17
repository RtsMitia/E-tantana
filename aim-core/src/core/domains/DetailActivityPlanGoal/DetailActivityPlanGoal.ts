import { IsNotEmpty } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DetailActivityPlan } from '../DetailActivityPlan/DetailActivityPlan';
import { EducationGoal } from '../EducationGoal/EducationGoal';
import { GeneralDto } from '../GeneralDto/GeneralDto';

@Entity('detail_activity_plan_goal')
export class DetailActivityPlanGoal extends GeneralDto {
    @IsNotEmpty()
    @Column()
    detail_activity_plan_id: number;

    @IsNotEmpty()
    @Column()
    education_goal_id: number;

    @ManyToOne((type) => DetailActivityPlan)
    @JoinColumn({ name: 'detail_activity_plan_id', referencedColumnName: 'id' })
    detailActivityPlan: DetailActivityPlan;

    @ManyToOne((type) => EducationGoal)
    @JoinColumn({ name: 'education_goal_id', referencedColumnName: 'id' })
    educationGoal: EducationGoal;
}
