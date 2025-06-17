import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IMemberGroupNameRepository } from 'src/core/domainServices/MemberGroupName/IMemberGroupNameRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IMemberGroupNameService } from './IMemberGroupNameService';

@Injectable()
export class MemberGroupNameService
    extends GeneralDtoService
    implements IMemberGroupNameService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.MEMBERGROUPNAME_REPOSITORY)
        private readonly memberGroupNameRepository: IMemberGroupNameRepository,
    ) {
        super(memberGroupNameRepository);
    }

    async fetchAllMemberGroupNamesWithCriteria(criteria): Promise<unknown> {
        return await this.memberGroupNameRepository.findAllMemberGroupNamesWithCriteria(
            criteria,
        );
    }

    async fetchMemberGroupNameById(id: number): Promise<unknown> {
        return await this.memberGroupNameRepository.findMemberGroupNameById(id);
    }
}
