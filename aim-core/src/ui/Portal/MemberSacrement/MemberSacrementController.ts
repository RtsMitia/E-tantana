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
import { IMemberSacrementService } from 'src/core/applicationServices/MemberSacrement/IMemberSacrementService';
import { Member } from 'src/core/domains/Member/Member';
import { MemberSacrement } from 'src/core/domains/MemberSacrement/MemberSacrement';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('memberSacrements')
export class MemberSacrementController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERSACREMENT_SERVICE)
        private memberSacrementService: IMemberSacrementService,
    ) {}

    @Get('checkSacrement/member/:id')
    checkSacrementConfirmationOfMember(@Param('id') id: number) {
        return this.memberSacrementService.checkSacrementConfirmationOfMember(
            id,
        );
    }

    @Get()
    async findAll(@Query() query: any) {
        return {
            memberSacrements:
                await this.memberSacrementService.fetchAllMemberSacrementsWithCriteria(
                    query,
                ),
        };
    }

    @Post('saveMember')
    async createMemberAndMemberSacrement(@Body() member: Member, @Body() body) {
        return this.memberSacrementService.createMemberAndMemberSacrement(
            member,
            body,
        );
    }

    @Get(':id')
    async findOneMemberSacrement(@Param('id') id: number) {
        return {
            memberSacrement:
                await this.memberSacrementService.fetchMemberSacrementById(id),
        };
    }

    @Post()
    async addMemberSacrement(@Body() memberSacrement: MemberSacrement) {
        return {
            memberSacrement: await this.memberSacrementService.save(
                memberSacrement,
            ),
        };
    }

    @Put(':id')
    updateMemberSacrement(
        @Param('id') id: number,
        @Body() memberSacrement: any,
    ) {
        return this.memberSacrementService.update(id, memberSacrement);
    }

    @Delete(':id')
    async deleteMemberSacrement(@Param('id') id: number) {
        return {
            memberSacrement: await this.memberSacrementService.delete(id),
        };
    }
}
