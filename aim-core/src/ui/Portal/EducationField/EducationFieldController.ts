import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    Inject,
} from '@nestjs/common';
import { IEducationFieldService } from 'src/core/applicationServices/EducationField/IEducationFieldService';
import { EducationField } from 'src/core/domains/EducationField/EducationField';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('educationFields')
export class EducationFieldController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.EDUCATIONFIELD_SERVICE)
        private educationFieldService: IEducationFieldService,
    ) {}

    @Put(':id')
    async updateEducationField(
        @Param('id') id: number,
        @Body() educationField: any,
    ) {
        return {
            educationField: await this.educationFieldService.update(
                id,
                educationField,
            ),
        };
    }

    @Post()
    async insertEducationField(@Body() educationField: EducationField) {
        return {
            educationField: await this.educationFieldService.save(
                educationField,
            ),
        };
    }

    @Delete(':id')
    async deleteEducationField(@Param('id') id: number) {
        return {
            educationField: await this.educationFieldService.delete(id),
        };
    }

    @Get(':id')
    async getEducationField(@Param('id') id: number) {
        return {
            educationField: await this.educationFieldService.fetchById(id),
        };
    }

    @Get()
    getAllEducationFields(@Query() query: any) {
        return this.educationFieldService.fetchAllWithCriteria(query);
    }
}
