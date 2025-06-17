import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectPartner } from 'src/core/domains/ProjectPartner/ProjectPartner';
import { IProjectPartnerRepository } from 'src/core/domainServices/ProjectPartner/IProjectPartnerRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectPartnerRepository
    extends GeneralDtoRepository
    implements IProjectPartnerRepository
{
    constructor(
        @InjectRepository(ProjectPartner)
        projectPartnerRepository: Repository<ProjectPartner>,
    ) {
        super(projectPartnerRepository);
    }
}
