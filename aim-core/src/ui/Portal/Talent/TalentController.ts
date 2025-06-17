import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ITalentService } from 'src/core/applicationServices/Talent/ITalentService';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { Talent } from 'src/core/domains/Talent/Talent';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('talents')
export class TalentController {
    joinProperties: JoinProperties[] = [
        {
            property: 'Talent.talentCategory',
            alias: 'talentCategory',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.TALENT_SERVICE)
        private talentService: ITalentService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            talent: await this.talentService.fetchById(id, this.joinProperties),
        };
    }

    @Get()
    async fetchAll() {
        return {
            talents: await this.talentService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() talent: Talent) {
        return {
            talent: await this.talentService.save(talent),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.talentService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.talentService.delete(id);
    }
}
