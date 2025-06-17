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
import { IMembershipFeeService } from 'src/core/applicationServices/MembershipFee/IMembershipFeeService';
import { MembershipFee } from 'src/core/domains/MembershipFee/MembershipFee';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('membershipFees')
export class MembershipFeeController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERSHIPFEE_SERVICE)
        private membershipFeeService: IMembershipFeeService,
    ) {}

    @Get('membershipFee')
    async getMembershipFee(@Query() data: any) {
        return {
            MembershipFee:
                await this.membershipFeeService.fetchMembershipFeeByMemberInfo(
                    data,
                ),
        };
    }

    @Get()
    async findAll(@Query() query: any) {
        return {
            membershipFees:
                await this.membershipFeeService.fetchAllMembershipFeesWithCriteria(
                    query,
                ),
        };
    }

    @Get(':id')
    async findOneMembershipFee(@Param('id') id: number) {
        return {
            membershipFee:
                await this.membershipFeeService.fetchMembershipFeeById(id),
        };
    }

    @Post()
    async addMembershipFee(@Body() membershipFee: MembershipFee) {
        membershipFee.status = '0';
        return {
            membershipFee: await this.membershipFeeService.save(membershipFee),
        };
    }

    @Put('validation/:id')
    membershipFeeValidation(@Param('id') id: number) {
        return this.membershipFeeService.membershipFeeValidation(id);
    }

    @Put(':id')
    updateMembershipFee(@Param('id') id: number, @Body() membershipFee: any) {
        return this.membershipFeeService.update(id, membershipFee);
    }

    @Delete(':id')
    async deleteMemberrshipFee(@Param('id') id: number) {
        return { membershipFee: await this.membershipFeeService.delete(id) };
    }
}
