import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IMemberRoleRepository } from 'src/core/domainServices/MemberRole/IMemberRoleRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IMemberRoleService } from './IMemberService';

@Injectable()
export class MemberRoleService
    extends GeneralDtoService
    implements IMemberRoleService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.MEMBERROLE_REPOSITORY)
        private memberRoleRepository: IMemberRoleRepository,
    ) {
        super(memberRoleRepository);
    }

    findAllWithHierarchy(criteria: any): Promise<unknown> {
        return this.memberRoleRepository.findAllWithHierarchy(criteria);
    }
}
