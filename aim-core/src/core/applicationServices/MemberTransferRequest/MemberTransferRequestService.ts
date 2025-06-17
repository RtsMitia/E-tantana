import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { MemberTransferRequest } from 'src/core/domains/MemberTransferRequest/MemberTransferRequest';
import { IMemberTransferRequestRepository } from 'src/core/domainServices/MemberTransferRequest/IMemberTransferRequestRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IMemberTransferRequestService } from './IMemberTransferRequestService';

@Injectable()
export class MemberTransferRequestService
    extends GeneralDtoService
    implements IMemberTransferRequestService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.MEMBERTRANSFERREQUEST_REPOSITORY)
        private readonly memberTransferRequestRepository: IMemberTransferRequestRepository,
    ) {
        super(memberTransferRequestRepository);
    }

    async memberTransferValidation(
        memberActivity: MemberActivity,
        memberTransferRequest: MemberTransferRequest,
        id: number,
    ) {
        return await this.memberTransferRequestRepository.memberTransferValidation(
            memberActivity,
            memberTransferRequest,
            id,
        );
    }

    async fetchAllMemberTransferRequest(criteria) {
        return await this.memberTransferRequestRepository.getAllMemberTransferRequest(
            criteria,
        );
    }
}
