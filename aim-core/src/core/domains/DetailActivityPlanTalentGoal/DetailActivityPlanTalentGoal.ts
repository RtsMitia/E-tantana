import { IsNotEmpty } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { DetailActivityPlan } from '../DetailActivityPlan/DetailActivityPlan';
import { TalentGoal } from '../TalentGoal/TalentGoal';

@Entity('detail_activity_plan_talent_goal')
export class DetailActivityPlanTalentGoal extends GeneralDto {
    @IsNotEmpty()
    @Column()
    detail_activity_plan_id: number;

    @IsNotEmpty()
    @Column()
    talent_goal_id: number;

    @ManyToOne((type) => DetailActivityPlan)
    @JoinColumn({ name: 'detail_activity_plan_id', referencedColumnName: 'id' })
    detailActivityPlan: DetailActivityPlan;

    @ManyToOne((type) => TalentGoal)
    @JoinColumn({ name: 'talent_goal_id', referencedColumnName: 'id' })
    talentGoal: TalentGoal;
}
