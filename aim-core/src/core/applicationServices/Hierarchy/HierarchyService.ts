import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IHierarchyRepository } from 'src/core/domainServices/Hierarchy/IHierarchyRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IHierarchyService } from './IHierarchyService';

@Injectable()
export class HierarchyService
    extends GeneralDtoService
    implements IHierarchyService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.HIERARCHY_REPOSITORY)
        private readonly hierarchyRepository: IHierarchyRepository,
    ) {
        super(hierarchyRepository);
    }

    async fetchAllHierarchies() {
        return await this.hierarchyRepository.findAllHierarchies();
    }

    async fetchHierarchies() {
        return await this.hierarchyRepository.getHierarchies();
    }
}
