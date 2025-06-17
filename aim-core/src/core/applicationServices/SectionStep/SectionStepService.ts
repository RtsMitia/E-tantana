import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ISectionStepRepository } from 'src/core/domainServices/SectionStep/ISectionStepRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { ISectionStepService } from './ISectionStepService';

@Injectable()
export class SectionStepService
    extends GeneralDtoService
    implements ISectionStepService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.SECTIONSTEP_REPOSITORY)
        private readonly sectionStepRepository: ISectionStepRepository,
    ) {
        super(sectionStepRepository);
    }

    fetchAllSectionStepsWithCriteria(criteria): Promise<unknown> {
        return this.sectionStepRepository.findAllSectionStepsWithCriteria(
            criteria,
        );
    }

    fetchSectionStepById(id: number): Promise<unknown> {
        return this.sectionStepRepository.findSectionStepById(id);
    }
}
