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
import { IMemberActivityService } from 'src/core/applicationServices/MemberActivity/IMemberActivityService';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('memberActivities')
export class MemberActivityController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERACTIVITY_SERVICE)
        private memberActivityService: IMemberActivityService,
    ) {}

    @Put(':id')
    async updateMemberActivity(
        @Param('id') id: number,
        @Body() memberActivity: any,
    ) {
        return {
            memberActivity:
                await this.memberActivityService.updateMemberActivity(
                    id,
                    memberActivity,
                ),
        };
    }

    @Get('member/:id')
    getMemberActivityForMember(@Param('id') id: number) {
        return this.memberActivityService.fetchMemberActivityForMember(id);
    }

    @Post()
    async insertMemberActivity(@Body() memberActivity: MemberActivity) {
        return {
            memberActivity:
                await this.memberActivityService.createMemberActivity(
                    memberActivity,
                ),
        };
    }

    @Delete(':id')
    async deleteMemberActivity(@Param('id') id: number) {
        return {
            memberActivity: await this.memberActivityService.delete(id),
        };
    }

    @Get('last/:member_id')
    async getLastMemberActivity(@Param('member_id') id: number) {
        return this.memberActivityService.fetchLastMemberActivity(id);
    }

    @Get(':id')
    async getMemberActivity(@Param('id') id: number) {
        return {
            memberActivity:
                await this.memberActivityService.fetchMemberActivityById(id),
        };
    }

    @Get()
    getAllMemberActivities(@Query() query: any) {
        return this.memberActivityService.fetchAllMemberActivitiesWithCriteria(
            query,
        );
    }
}
