import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ITalentGoalService } from 'src/core/applicationServices/TalentGoal/ITalentGoalService';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { TalentGoal } from 'src/core/domains/TalentGoal/TalentGoal';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('talentGoals')
export class TalentGoalController {
    joinProperties: JoinProperties[] = [
        {
            property: 'TalentGoal.talent',
            alias: 'talent',
        },
        {
            property: 'TalentGoal.section',
            alias: 'section',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.TALENTGOAL_SERVICE)
        private talentGoalService: ITalentGoalService,
    ) {}

    @Get(':id')
    async fetchOne(@Param('id') id: number) {
        return {
            talentGoal: await this.talentGoalService.fetchById(
                id,
                this.joinProperties,
            ),
        };
    }

    @Get()
    async fetchAll(@Query() criteria: any) {
        return await this.talentGoalService.fetchAllWithCriteria(
            criteria,
            this.joinProperties,
        );
    }

    @Post()
    async create(@Body() talentGoal: TalentGoal) {
        return {
            talentGoal: await this.talentGoalService.save(talentGoal),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.talentGoalService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.talentGoalService.delete(id);
    }
}
