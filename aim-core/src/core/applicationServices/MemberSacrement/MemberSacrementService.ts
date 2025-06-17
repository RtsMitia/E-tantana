import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Member } from 'src/core/domains/Member/Member';
import { IMemberSacrementRepository } from 'src/core/domainServices/MemberSacrement/IMemberSacrementRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IMemberSacrementService } from './IMemberSacrementService';

@Injectable()
export class MemberSacrementService
    extends GeneralDtoService
    implements IMemberSacrementService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.MEMBERSACREMENT_REPOSITORY)
        private memberSacrementRepository: IMemberSacrementRepository,
    ) {
        super(memberSacrementRepository);
    }

    async fetchAllMemberSacrementsWithCriteria(criteria): Promise<unknown> {
        return await this.memberSacrementRepository.findAllMemberSacrementsWithCriteria(
            criteria,
        );
    }

    async createMemberAndMemberSacrement(memberData: Member, query: any) {
        return await this.memberSacrementRepository.createMemberAndMemberSacrement(
            memberData,
            query,
        );
    }

    async fetchMemberSacrementById(id: number): Promise<unknown> {
        return await this.memberSacrementRepository.findMemberSacrementById(id);
    }

    async checkSacrementConfirmationOfMember(id: number) {
        return await this.memberSacrementRepository.checkSacrementConfirmationOfMember(
            id,
        );
    }
}
