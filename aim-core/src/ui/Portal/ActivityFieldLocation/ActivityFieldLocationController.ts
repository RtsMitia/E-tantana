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
import { IActivityFieldLocationService } from 'src/core/applicationServices/ActivityFieldLocation/IActivityFieldLocationService';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('activityFieldLocations')
export class ActivityFieldLocationController {
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
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELDLOCATION_SERVICE)
        private activityFieldLocationService: IActivityFieldLocationService,
    ) {}

    @Get()
    async findAll(@Query() criteria: any) {
        const result = await this.activityFieldLocationService.fetchAllWithCriteria(
            criteria,
            this.joinProperties,
        );
        return {
            data: result.data,
        };
    }

    @Get('diosezy')
    async getAllDiosezy() {
        console.log("miditra diosezy");
        return {
            data: await this.activityFieldLocationService.fetchAllDiosezyWithGeometry(),
        };
    }


    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            activityField: await this.activityFieldLocationService.fetchById(
                id,
                this.joinProperties,
            ),
        };
    }

    @Post()
    async add(@Body() activityField: ActivityField) {
        return {
            activityField: await this.activityFieldLocationService.save(activityField),
        };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() memberRole: any) {
        return this.activityFieldLocationService.update(id, memberRole);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return { activityField: await this.activityFieldLocationService.delete(id) };
    }


}
