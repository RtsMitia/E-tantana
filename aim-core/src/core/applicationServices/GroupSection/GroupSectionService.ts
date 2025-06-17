import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IGroupSectionRepository } from 'src/core/domainServices/GroupSection/IGroupSectionRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IGroupSectionService } from './IGroupSectionService';

@Injectable()
export class GroupSectionService
    extends GeneralDtoService
    implements IGroupSectionService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.GROUPSECTION_REPOSITORY)
        private readonly groupSectionRepository: IGroupSectionRepository,
    ) {
        super(groupSectionRepository);
    }

    async fetchAllGroupSectionsWithCriteria(criteria): Promise<unknown> {
        return await this.groupSectionRepository.findAllGroupSectionsWithCriteria(
            criteria,
        );
    }

    async fetchGroupSectionById(id: number): Promise<unknown> {
        return await this.groupSectionRepository.findGroupSectionById(id);
    }
}
