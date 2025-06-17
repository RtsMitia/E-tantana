import { Inject, Injectable } from '@nestjs/common';
import { GeneralDtoService } from 'src/core/applicationServices/GeneralDto/GeneralDtoService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { IMemberActivityRepository } from 'src/core/domainServices/MemberActivity/IMemberActivityRepository';
import { IMemberActivityService } from './IMemberActivityService';

@Injectable()
export class MemberActivityService
    extends GeneralDtoService
    implements IMemberActivityService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.MEMBERACTIVITY_REPOSITORY)
        private readonly memberActivityRepository: IMemberActivityRepository,
    ) {
        super(memberActivityRepository);
    }

    async updateMemberActivity(id, memberActivity: MemberActivity) {
        return await this.memberActivityRepository.updateMemberActivity(
            id,
            memberActivity,
        );
    }

    async createMemberActivity(memberActivity: MemberActivity) {
        return await this.memberActivityRepository.createMemberActivity(
            memberActivity,
        );
    }

    async fetchAllMemberActivitiesWithCriteria(criteria): Promise<unknown> {
        return await this.memberActivityRepository.findAllMemberActivitiesWithCriteria(
            criteria,
        );
    }

    async fetchNationalPresident() {
        return await this.memberActivityRepository.getNationalPresident();
    }

    async fetchMemberActivityById(id: number): Promise<unknown> {
        return await this.memberActivityRepository.findMemberActivityById(id);
    }

    async fetchLastMemberActivity(member_id: number) {
        return await this.memberActivityRepository.getLastMemberActivity(
            member_id,
        );
    }

    async fetchMemberActivityForMember(id: number) {
        return await this.memberActivityRepository.getMemberActivityForMember(
            id,
        );
    }
}
