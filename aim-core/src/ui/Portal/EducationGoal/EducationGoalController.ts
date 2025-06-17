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
import { IEducationGoalService } from 'src/core/applicationServices/EducationGoal/IEducationGoalService';
import { EducationGoal } from 'src/core/domains/EducationGoal/EducationGoal';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('educationGoals')
export class EducationGoalController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.EDUCATIONGOAL_SERVICE)
        private educationGoalService: IEducationGoalService,
    ) {}

    @Put(':id')
    async updateEducationGoal(
        @Param('id') id: number,
        @Body() educationGoal: any,
    ) {
        return {
            educationGoal: await this.educationGoalService.update(
                id,
                educationGoal,
            ),
        };
    }

    @Post()
    async insertEducationGoal(@Body() educationGoal: EducationGoal) {
        return {
            educationGoal: await this.educationGoalService.save(educationGoal),
        };
    }

    @Delete(':id')
    async deleteEducationGoal(@Param('id') id: number) {
        return {
            educationGoal: await this.educationGoalService.delete(id),
        };
    }

    @Get(':id')
    async getEducationGoal(@Param('id') id: number) {
        return {
            educationGoal:
                await this.educationGoalService.fetchEducationGoalById(id),
        };
    }

    @Get()
    getAllEducationGoals(@Query() query: any) {
        return this.educationGoalService.fetchAllEducationGoalsWithCriteria(
            query,
        );
    }
}
