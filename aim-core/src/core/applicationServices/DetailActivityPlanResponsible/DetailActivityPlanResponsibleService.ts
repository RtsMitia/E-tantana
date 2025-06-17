import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IDetailActivityPlanResponsibleRepository } from 'src/core/domainServices/DetailActivityPlanResponsible/IDetailActivityPlanResponsibleRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IDetailActivityPlanResponsibleService } from './IDetailActivityPlanResponsibleService';

@Injectable()
export class DetailActivityPlanResponsibleService
    extends GeneralDtoService
    implements IDetailActivityPlanResponsibleService
{
    constructor(
        @Inject(
            REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLANRESPONSIBLE_REPOSITORY,
        )
        private readonly detailActivityPlanResponsibleRepository: IDetailActivityPlanResponsibleRepository,
    ) {
        super(detailActivityPlanResponsibleRepository);
    }

    async createDetailActivityPlanResponsible(data) {
        return this.detailActivityPlanResponsibleRepository.createDetailActivityPlanResponsible(
            data,
        );
    }
}
