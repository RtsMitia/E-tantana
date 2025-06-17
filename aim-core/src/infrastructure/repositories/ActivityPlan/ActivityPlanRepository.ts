import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDetailActivityPlanService } from 'src/core/applicationServices/DetailActivityPlan/IDetailActivityPlanService';
import { IDetailActivityPlanGoalService } from 'src/core/applicationServices/DetailActivityPlanGoal/IDetailActivityPlanGoalService';
import { IDetailActivityPlanResponsibleService } from 'src/core/applicationServices/DetailActivityPlanResponsible/IDetailActivityPlanResponsibleService';
import { IDetailActivityPlanTalentGoalService } from 'src/core/applicationServices/DetailActivityPlanTalentGoal/IDetailActivityPlanTalentGoalService';
import { ActivityPlan } from 'src/core/domains/ActivityPlan/ActivityPlan';
import { GlobalActivityPlan } from 'src/core/domains/GlobalActivityPlan/GlobalActivityPlan';
import { IActivityPlanRepository } from 'src/core/domainServices/ActivityPlan/IActivityPlanRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ActivityPlanRepository
    extends GeneralDtoRepository
    implements IActivityPlanRepository
{
    constructor(
        @InjectRepository(ActivityPlan)
        private activityPlanRepository: Repository<ActivityPlan>,
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLAN_SERVICE)
        private detailActivityPlanService: IDetailActivityPlanService,
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANGOAL_SERVICE)
        private detailActivityPlanGoalService: IDetailActivityPlanGoalService,
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANTALENTGOAL_SERVICE)
        private detailActivityPlanTalentGoalService: IDetailActivityPlanTalentGoalService,
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANRESPONSIBLE_SERVICE)
        private detailActivityPlanResponsibleService: IDetailActivityPlanResponsibleService,
    ) {
        super(activityPlanRepository);
    }

    async createActivityPlan(data: GlobalActivityPlan) {
        try {
            const activityPlan = await this.activityPlanRepository.save(
                data.activityPlan,
            );
            data.activityPlan.id = activityPlan.id;
            data.activities.forEach(async (a) => {
                a.activity.activity_plan_id = activityPlan.id;
                const activity: any = await this.detailActivityPlanService.save(
                    a.activity,
                );
                a.educationGoals.forEach(async (eg) => {
                    eg.detail_activity_plan_id = activity.id;
                    await this.detailActivityPlanGoalService.save(eg);
                });
                a.talentGoals.forEach(async (tg) => {
                    tg.detail_activity_plan_id = activity.id;
                    await this.detailActivityPlanTalentGoalService.save(tg);
                });
                a.responsibles.forEach(async (r) => {
                    r.detail_activity_plan_id = activity.id;
                    await this.detailActivityPlanResponsibleService.save(r);
                });
            });
            return data;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: error.sqlMessage,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
