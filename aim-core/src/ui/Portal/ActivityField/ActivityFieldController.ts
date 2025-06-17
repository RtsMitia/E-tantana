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
import { IActivityFieldService } from 'src/core/applicationServices/ActivityField/IActivityFieldService';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('activityFields')
export class ActivityFieldController {
    joinProperties: JoinProperties[] = [
        {
            property: 'ActivityField.hierarchy',
            alias: 'hierarchy',
        },
        {
            property: 'ActivityField.superior',
            alias: 'superior',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE)
        private activityFieldService: IActivityFieldService,
    ) {}

    @Get('superior/:id')
    getAllInferiorActivityFields(@Param('id') id: number) {
        return {
            activityFields:
                this.activityFieldService.getAllInferiorActivityFields(id),
        };
    }

    @Post('superiorFieldAndHierarchy')
    async getActivityFieldsFromSuperiorFieldAndHierarchy(
        @Body() criteria: any,
    ) {
        return {
            activityFieds:
                await this.activityFieldService.fetchActivityFieldsFromSuperiorFieldIdAndHierarchy(
                    criteria,
                ),
        };
    }

    @Get()
    async findAll(@Query() criteria: any) {
        return {
            activityFields:
                await this.activityFieldService.fetchAllWithCriteria(
                    criteria,
                    this.joinProperties,
                ),
        };
    }

    @Get('paymentStatistic')
    lol(@Query() q) {
        return this.activityFieldService.paymentStatisticByHierarchy(q);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            activityField: await this.activityFieldService.fetchById(
                id,
                this.joinProperties,
            ),
        };
    }

    @Post()
    async add(@Body() activityField: ActivityField) {
        return {
            activityField: await this.activityFieldService.save(activityField),
        };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() memberRole: any) {
        return this.activityFieldService.update(id, memberRole);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return { activityField: await this.activityFieldService.delete(id) };
    }
}
