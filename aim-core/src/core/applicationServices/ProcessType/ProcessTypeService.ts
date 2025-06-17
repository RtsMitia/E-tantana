import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProcessTypeRepository } from 'src/core/domainServices/ProcessType/IProcessTypeRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProcessTypeService } from './IProcessTypeService';

@Injectable()
export class ProcessTypeService
    extends GeneralDtoService
    implements IProcessTypeService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROCESSTYPE_REPOSITORY)
        processTypeRepository: IProcessTypeRepository,
    ) {
        super(processTypeRepository);
    }
}
