import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MembershipFee } from 'src/core/domains/MembershipFee/MembershipFee';
import { IMembershipFeeRepository } from 'src/core/domainServices/MembershipFee/IMembershipFeeRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IMembershipFeeService } from './IMembershipFeeService';

@Injectable()
export class MembershipFeeService
    extends GeneralDtoService
    implements IMembershipFeeService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.MEMBERSHIPFEE_REPOSITORY)
        private readonly membershipFeeRepository: IMembershipFeeRepository,
    ) {
        super(membershipFeeRepository);
    }

    membershipFeeValidation(id: number): Promise<unknown> {
        return this.membershipFeeRepository.membershipFeeValidation(id);
    }

    async fetchAllMembershipFeesWithCriteria(criteria): Promise<unknown> {
        return await this.membershipFeeRepository.findAllMembershipFeesWithCriteria(
            criteria,
        );
    }

    async fetchMembershipFeeByMemberInfo(data: any): Promise<MembershipFee> {
        return await this.membershipFeeRepository.getMembershipFeeByMemberInfo(
            data,
        );
    }

    async fetchMembershipFeeByMemberInfoName(
        data: any,
    ): Promise<MembershipFee> {
        return await this.membershipFeeRepository.getMembershipFeeByMemberInfoName(
            data,
        );
    }

    async fetchMembershipFeeById(id: number): Promise<unknown> {
        return await this.membershipFeeRepository.findMembershipFeeById(id);
    }
}
