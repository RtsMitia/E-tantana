import { IsNotEmpty } from 'class-validator';
import { DetailActivityPlan } from '../DetailActivityPlan/DetailActivityPlan';
import { DetailActivityPlanGoal } from '../DetailActivityPlanGoal/DetailActivityPlanGoal';
import { DetailActivityPlanResponsible } from '../DetailActivityPlanResponsible/DetailActivityPlanResponsible';
import { DetailActivityPlanTalentGoal } from '../DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoal';

export class GlobalDetailActivityPlan {
    @IsNotEmpty()
    activity: DetailActivityPlan;

    @IsNotEmpty()
    responsibles: DetailActivityPlanResponsible[];

    @IsNotEmpty()
    educationGoals: DetailActivityPlanGoal[];

    @IsNotEmpty()
    talentGoals: DetailActivityPlanTalentGoal[];
}
