import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProjectPartnerRepository } from 'src/core/domainServices/ProjectPartner/IProjectPartnerRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectPartnerService } from './IProjectPartnerService';

@Injectable()
export class ProjectPartnerService
    extends GeneralDtoService
    implements IProjectPartnerService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTPARTNER_REPOSITORY)
        projectPartnerRepository: IProjectPartnerRepository,
    ) {
        super(projectPartnerRepository);
    }
}
