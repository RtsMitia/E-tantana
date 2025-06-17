import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ISectionRepository } from 'src/core/domainServices/Section/ISectionRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { ISectionService } from './ISectionService';

@Injectable()
export class SectionService
    extends GeneralDtoService
    implements ISectionService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.SECTION_REPOSITORY)
        ectionRepository: ISectionRepository,
    ) {
        super(ectionRepository);
    }
}
