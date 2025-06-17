import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ISacrementRepository } from 'src/core/domainServices/Sacrement/ISacrementRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { ISacrementService } from './ISacrementService';

@Injectable()
export class SacrementService
    extends GeneralDtoService
    implements ISacrementService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.SACREMENT_REPOSITORY)
        SacrementRepository: ISacrementRepository,
    ) {
        super(SacrementRepository);
    }
}
