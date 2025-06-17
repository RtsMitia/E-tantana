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
import { IMemberService } from 'src/core/applicationServices/Member/IMemberService';
import { Member } from 'src/core/domains/Member/Member';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('members')
export class MemberController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.MEMBER_SERVICE)
        private memberService: IMemberService,
    ) {}

    @Get('card/:id')
    getMemberCard(@Param('id') id: number) {
        return this.memberService.fetchMemberCard(id);
    }

    @Get('member')
    getMemberWithCriteria(@Body() query: any) {
        return this.memberService.fetchMemberWithCriteria(query);
    }

    @Put(':id')
    async updateMember(@Param('id') id: number, @Body() member: any) {
        return {
            member: await this.memberService.update(id, member),
        };
    }

    @Post()
    async insertMember(@Body() member: Member) {
        return {
            member: await this.memberService.save(member),
        };
    }

    @Delete(':id')
    async deleteMember(@Param('id') id: number) {
        return {
            member: await this.memberService.delete(id),
        };
    }

    @Get(':id')
    async getMember(@Param('id') id: number) {
        return {
            member: await this.memberService.fetchById(id),
        };
    }

    @Get()
    getAllMembers(@Query() query: any) {
        return this.memberService.fetchAllWithCriteria(query, [
            {
                property: 'Member.adultInfo',
                alias: 'adultInfo',
            },
            {
                property: 'Member.youthInfo',
                alias: 'youthInfo',
            },
        ]);
    }
}
