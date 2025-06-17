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
import { IMemberRoleService } from 'src/core/applicationServices/MemberRole/IMemberService';
import { MemberRole } from 'src/core/domains/MemberRole/MemberRole';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('memberRoles')
export class MemberRoleController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERROLE_SERVICE)
        private memberRoleService: IMemberRoleService,
    ) {}

    @Get()
    async findAll(@Query() criteria: any) {
        return {
            memberRoles: await this.memberRoleService.findAllWithHierarchy(
                criteria,
            ),
        };
    }

    @Get(':id')
    async findOneMemberRole(@Param('id') id: number) {
        return { memberRole: await this.memberRoleService.fetchById(id) };
    }

    @Post()
    async addMemberRole(@Body() memberRole: MemberRole) {
        return { memberRole: await this.memberRoleService.save(memberRole) };
    }

    @Put(':id')
    updateMemberRole(@Param('id') id: number, @Body() memberRole: any) {
        return this.memberRoleService.update(id, memberRole);
    }

    @Delete(':id')
    async deleteMemebrRole(@Param('id') id: number) {
        return { memberRole: await this.memberRoleService.delete(id) };
    }
}
