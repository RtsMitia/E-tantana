import { IsNotEmpty } from 'class-validator';
import { ActivityPlan } from '../ActivityPlan/ActivityPlan';
import { GlobalDetailActivityPlan } from '../GlobalDetailActivityPlan/GlobalDetailActivityPlan';
export class GlobalActivityPlan {
    @IsNotEmpty()
    activityPlan: ActivityPlan;

    @IsNotEmpty()
    activities: GlobalDetailActivityPlan[];
}
