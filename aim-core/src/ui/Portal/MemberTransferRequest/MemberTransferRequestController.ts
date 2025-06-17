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
import { IMemberTransferRequestService } from 'src/core/applicationServices/MemberTransferRequest/IMemberTransferRequestService';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { MemberTransferRequest } from 'src/core/domains/MemberTransferRequest/MemberTransferRequest';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('memberTransferRequests')
export class MemberTransferRequestController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERTRANSFERREQUEST_SERVICE)
        private memberTransferRequestService: IMemberTransferRequestService,
    ) {}

    @Post()
    async save(@Body() memberTransferRequest: MemberTransferRequest) {
        memberTransferRequest.status = 0; // request
        return this.memberTransferRequestService.save(memberTransferRequest);
    }

    @Put('validation/:id')
    async memberTransferRequest(
        @Param('id') id: number,
        @Body() memberActivity: MemberActivity,
        @Body() memberTransferRequest: MemberTransferRequest,
    ) {
        return this.memberTransferRequestService.memberTransferValidation(
            memberActivity,
            memberTransferRequest,
            id,
        );
    }

    @Delete(':id')
    async declineMemberTransferRequest(@Param('id') id: number) {
        this.memberTransferRequestService.delete(id);
    }

    @Get(':level')
    async getAllMemberTransferRequests(
        @Query() criteria: any,
        @Param('level') level: number,
    ) {
        criteria.level = level;
        return this.memberTransferRequestService.fetchAllMemberTransferRequest(
            criteria,
        );
    }
}
