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
import { IMemberGroupNameService } from 'src/core/applicationServices/MemberGroupName/IMemberGroupNameService';
import { MemberGroupName } from 'src/core/domains/MemberGroupName/MemberGroupName';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Controller('memberGroupNames')
export class MemberGroupNameController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERGROUPNAME_SERVICE)
        private memberGroupNameService: IMemberGroupNameService,
    ) {}

    @Put(':id')
    async updateMemberGroupName(
        @Param('id') id: number,
        @Body() memberGroupName: any,
    ) {
        return {
            memberGroupName: await this.memberGroupNameService.update(
                id,
                memberGroupName,
            ),
        };
    }

    @Post()
    async insertMemberGroupName(@Body() memberGroupName: MemberGroupName) {
        return {
            memberGroupName: await this.memberGroupNameService.save(
                memberGroupName,
            ),
        };
    }

    @Delete(':id')
    async deleteMemberGroupName(@Param('id') id: number) {
        return {
            memberGroupName: await this.memberGroupNameService.delete(id),
        };
    }

    @Get(':id')
    async getMemberGroupName(@Param('id') id: number) {
        return {
            memberGroupName:
                await this.memberGroupNameService.fetchMemberGroupNameById(id),
        };
    }

    @Get()
    getAllMemberGroupNames(@Query() query: any) {
        return this.memberGroupNameService.fetchAllMemberGroupNamesWithCriteria(
            query,
        );
    }
}
